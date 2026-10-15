#!/usr/bin/env python3
"""Upload static files and atomically activate a release on the configured server."""
from pathlib import Path
import hashlib
import shlex
import subprocess
import tarfile
import tempfile
import uuid

ROOT = Path(__file__).resolve().parents[1]
HOST = 'alex@72.61.182.84'
RELEASE = 'cv-' + uuid.uuid4().hex
REMOTE_ARCHIVE = '/tmp/' + RELEASE + '.tar.gz'

REMOTE_SCRIPT = r'''
from pathlib import Path
import ctypes, hashlib, os, subprocess, sys, tarfile
archive, release_id, expected_hash = sys.argv[1:]
upload = Path(archive)
if hashlib.sha256(upload.read_bytes()).hexdigest() != expected_hash:
    raise RuntimeError('Upload checksum mismatch')
releases = Path('/var/www/cv-releases')
releases.mkdir(exist_ok=True, mode=0o755)
release = releases / release_id
release.mkdir(mode=0o755)
with tarfile.open(upload) as tar:
    for member in tar.getmembers():
        if not member.isfile() or Path(member.name).name != member.name:
            raise RuntimeError('Unexpected archive member')
        data = tar.extractfile(member).read()
        path = release / member.name
        path.write_bytes(data)
        path.chmod(0o644)
if not (release / 'index.html').is_file():
    raise RuntimeError('Missing index.html')
subprocess.run(['nginx', '-t'], check=True)
current = Path('/var/www/away.carapulko.xyz')
pending = Path('/var/www/' + release_id + '.next')
pending.symlink_to(release, target_is_directory=True)
if current.is_symlink():
    previous = str(current.resolve())
    os.replace(pending, current)
elif current.is_dir():
    # Exchange the existing directory and the new symlink without a missing-root window.
    libc = ctypes.CDLL(None, use_errno=True)
    rename = libc.renameat2
    rename.argtypes = [ctypes.c_int, ctypes.c_char_p, ctypes.c_int, ctypes.c_char_p, ctypes.c_uint]
    rename.restype = ctypes.c_int
    if rename(-100, os.fsencode(pending), -100, os.fsencode(current), 2) != 0:
        error = ctypes.get_errno()
        pending.unlink()
        raise OSError(error, os.strerror(error))
    previous = str(releases / ('previous-' + release_id))
    os.rename(pending, previous)
else:
    previous = '(none)'
    os.replace(pending, current)
upload.unlink()
print('Active release:', release)
print('Previous release:', previous)
print('Rollback: sudo ln -s ' + previous + ' /var/www/cv-rollback.next && sudo mv -Tf /var/www/cv-rollback.next /var/www/away.carapulko.xyz')
'''


def main():
    files = sorted((ROOT / 'dist').iterdir())
    if not files or any(not path.is_file() for path in files):
        raise RuntimeError('Expected a flat directory of static files in dist/')
    with tempfile.TemporaryDirectory(prefix='cv-deploy-') as temporary:
        archive = Path(temporary) / 'site.tar.gz'
        with tarfile.open(archive, 'w:gz') as tar:
            for path in files:
                tar.add(path, arcname=path.name, recursive=False)
        digest = hashlib.sha256(archive.read_bytes()).hexdigest()
        subprocess.run(['scp', '-o', 'BatchMode=yes', str(archive), HOST + ':' + REMOTE_ARCHIVE], check=True)
        command = shlex.join(['sudo', '-n', 'python3', '-', REMOTE_ARCHIVE, RELEASE, digest])
        subprocess.run(['ssh', '-o', 'BatchMode=yes', HOST, command], input=REMOTE_SCRIPT, text=True, check=True)


if __name__ == '__main__':
    main()
