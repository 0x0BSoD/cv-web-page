(() => {
  'use strict';
  const ru = {
    'skip': 'Перейти к содержимому',
    'nav.profile': 'Обо мне', 'nav.work': 'Проекты', 'nav.credentials': 'Обучение',
    'nav.contact': 'На связи <span aria-hidden="true">↗</span>',
    'hero.eyebrow': 'PLATFORM / DEVOPS ENGINEER',
    'hero.line1': 'Системы.', 'hero.line2': 'Код.', 'hero.line3': 'Ясность.',
    'hero.intro': 'Я — Александр Симонов. Platform Engineer: занимаюсь Kubernetes, автоматизацией инфраструктуры и инструментами для разработчиков.',
    'hero.cta': 'Мои проекты <span aria-hidden="true">↘</span>',
    'hero.resume': 'Резюме (PDF) <span aria-hidden="true">↗</span>',
    'location': 'ЛИМАСОЛ, КИПР', 'hero.scroll': 'Подробнее обо мне ↓',
    'profile.label': 'ОБО МНЕ',
    'profile.title': 'Инфраструктура — фундамент.<br><span class="serif">Инструменты — усилитель.</span>',
    'profile.intro': 'Работаю в Platform Engineering и DevOps. Вне основной работы создаю открытые инструменты для Kubernetes, воспроизводимых окружений и повседневной автоматизации.',
    'profile.role.label': 'СПЕЦИАЛИЗАЦИЯ', 'profile.role': 'Senior Platform / DevOps Engineer',
    'profile.company.label': 'КОМПАНИЯ', 'profile.languages.label': 'ЯЗЫКИ',
    'profile.languages': 'Английский · Русский',
    'profile.history': 'Опыт работы в LinkedIn <span aria-hidden="true">↗</span>',
    'focus.1.title': 'Cloud-native системы',
    'focus.1.body': 'Kubernetes, операторы и инструменты, которые помогают понять, что происходит в кластере.',
    'focus.2.title': 'Воспроизводимая инфраструктура',
    'focus.2.body': 'Nix-окружения, инфраструктура как код и конфигурация под контролем версий.',
    'focus.3.title': 'Практичная автоматизация',
    'focus.3.body': 'Сервисы на Go, утилиты командной строки и интеграции, которые связывают компоненты.',
    'work.label': 'ИЗБРАННЫЕ ПРОЕКТЫ',
    'work.title': 'Код для решения<br><span class="serif">реальных задач.</span>',
    'work.intro': 'Мои личные проекты с открытым кодом.<br>От диагностики кластеров до воспроизводимых окружений.',
    'project.mcp': 'Наблюдаемость Kubernetes: события с контекстом владельцев, временные шкалы и поиск причин. Агент и координатор связаны по gRPC; объяснения с помощью LLM — опционально.',
    'project.flake': 'Упаковка Codex CLI и desktop-приложения для Nix: модуль NixOS и поддержка Linux на x86_64 и aarch64.',
    'project.bot': 'Telegram-интерфейс для Transmission. Управление загрузками и очередью, уведомления о завершении — прямо в чате.',
    'project.nix': 'Моя личная Nix-конфигурация. Воспроизводимые системы и окружения разработки под контролем версий.',
    'source': 'Исходный код ↗', 'work.all': 'Больше экспериментов, инструментов и кода на GitHub',
    'credentials.label': 'ПОСТОЯННОЕ РАЗВИТИЕ',
    'credentials.title': 'Практика.<br><span class="serif">И ещё глубже.</span>',
    'credentials.intro': 'Системное обучение в дополнение к инженерной практике.',
    'date.cka': 'МАР 2025 — МАР 2027', 'date.ckad': 'ЯНВ 2025 — ЯНВ 2027',
    'date.gitops': 'АПР 2022', 'date.english': 'МАР 2023',
    'credential.english': '66/100 · Продвинутый английский',
    'education.label': 'ОБРАЗОВАНИЕ / 2007 — 2009',
    'education.title': 'Техник-программист',
    'education.school': 'Кемеровский профессионально-технический колледж',
    'education.subject': 'Программное обеспечение вычислительной техники и автоматизированных систем',
    'contact.label': 'СЛЕДУЮЩЕЕ ЗНАКОМСТВО',
    'contact.title': 'Создадим<br><span class="serif">что-то полезное.</span>',
    'contact.intro': 'Есть задача для платформы, идея проекта<br>или хочется обменяться опытом?',
    'contact.linkedin': 'Связаться в LinkedIn', 'contact.github': 'Мой GitHub',
    'contact.print': 'Распечатать / сохранить PDF',
    'contact.resume': 'Скачать резюме (PDF)',
    'footer.location': 'Сделано в Лимасоле, Кипр.', 'footer.top': 'Наверх ↑'
  };
  const elements = [...document.querySelectorAll('[data-i18n]')];
  const en = Object.fromEntries(elements.map(el => [el.dataset.i18n, el.innerHTML]));
  const languageButton = document.getElementById('language');
  let language = 'en';
  function setLanguage(next) {
    language = next;
    const dictionary = next === 'ru' ? ru : en;
    for (const el of elements) {
      const value = dictionary[el.dataset.i18n];
      if (value !== undefined) el.innerHTML = value;
    }
    document.documentElement.lang = next;
    document.title = next === 'ru'
      ? 'Александр Симонов — Platform & DevOps Engineer'
      : 'Aleksandr Simonov — Platform & DevOps Engineer';
    languageButton.innerHTML = `${next === 'en' ? 'RU' : 'EN'} <span aria-hidden="true">↗</span>`;
    languageButton.setAttribute('aria-label', next === 'en' ? 'Switch to Russian' : 'Switch to English');
    document.querySelector('nav').setAttribute('aria-label', next === 'en' ? 'Main navigation' : 'Основная навигация');
    try { localStorage.setItem('cv-language', next); } catch { /* Storage may be disabled. */ }
  }
  languageButton.addEventListener('click', () => setLanguage(language === 'en' ? 'ru' : 'en'));
  document.getElementById('print').addEventListener('click', () => window.print());
  try { if (localStorage.getItem('cv-language') === 'ru') setLanguage('ru'); } catch { /* English remains readable. */ }

  // A decorative, local-only network; the page remains usable without canvas.
  const hero = document.querySelector('.hero');
  const canvas = hero.querySelector('.hero-network');
  const context = canvas.getContext('2d');
  if (!context) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = { x: 0, y: 0, active: false };
  let width = 0;
  let height = 0;
  let points = [];
  let frame = 0;
  let lastTime = 0;
  let elapsed = 0;
  let inView = true;

  function draw(delta) {
    elapsed += delta;
    context.clearRect(0, 0, width, height);
    const reach = Math.min(155, width * 0.32);
    for (const point of points) {
      const baseX = point.x + Math.sin(elapsed * 0.16 + point.phase) * 12;
      const baseY = point.y + Math.cos(elapsed * 0.12 + point.phase) * 10;
      const dx = baseX - pointer.x;
      const dy = baseY - pointer.y;
      const distance = Math.hypot(dx, dy);
      const force = pointer.active ? Math.max(0, 1 - distance / 150) : 0;
      const ease = 1 - Math.exp(-delta * 5);
      point.offsetX += ((dx / (distance || 1)) * force * 25 - point.offsetX) * ease;
      point.offsetY += ((dy / (distance || 1)) * force * 25 - point.offsetY) * ease;
      point.drawX = baseX + point.offsetX;
      point.drawY = baseY + point.offsetY;
      point.glow = force;
    }
    context.lineWidth = 0.7;
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      for (let j = i + 1; j < points.length; j++) {
        const other = points[j];
        const distance = Math.hypot(point.drawX - other.drawX, point.drawY - other.drawY);
        if (distance >= reach) continue;
        const opacity = (1 - distance / reach) * (0.15 + Math.max(point.glow, other.glow) * 0.16);
        context.strokeStyle = `rgba(108, 127, 86, ${opacity})`;
        context.beginPath();
        context.moveTo(point.drawX, point.drawY);
        context.lineTo(other.drawX, other.drawY);
        context.stroke();
      }
      context.fillStyle = `rgba(108, 127, 86, ${0.25 + point.glow * 0.3})`;
      context.beginPath();
      context.arc(point.drawX, point.drawY, 1.4 + point.glow * 0.6, 0, Math.PI * 2);
      context.fill();
    }
  }

  function animate(time) {
    const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
    lastTime = time;
    draw(delta);
    frame = requestAnimationFrame(animate);
  }

  function syncAnimation() {
    cancelAnimationFrame(frame);
    lastTime = 0;
    if (!reducedMotion.matches && !document.hidden && inView) {
      frame = requestAnimationFrame(animate);
    } else if (reducedMotion.matches) {
      pointer.active = false;
      for (const point of points) point.offsetX = point.offsetY = 0;
      draw(0);
    }
  }

  function resize() {
    width = hero.clientWidth;
    height = hero.clientHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    const count = Math.min(76, Math.max(24, Math.round(width * height / 14000)));
    // Spread the points evenly, with a little variation to avoid a rigid grid.
    const columns = Math.ceil(Math.sqrt(count * width / height));
    const rows = Math.ceil(count / columns);
    points = Array.from({ length: count }, (_, index) => ({
      x: ((index % columns) + 0.2 + Math.random() * 0.6) * width / columns,
      y: (Math.floor(index / columns) + 0.2 + Math.random() * 0.6) * height / rows,
      phase: Math.random() * Math.PI * 2,
      offsetX: 0,
      offsetY: 0
    }));
    pointer.active = false;
    draw(0);
  }

  hero.addEventListener('pointermove', event => {
    if (reducedMotion.matches || event.pointerType === 'touch') return;
    const bounds = hero.getBoundingClientRect();
    pointer.x = event.clientX - bounds.left;
    pointer.y = event.clientY - bounds.top;
    pointer.active = true;
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { pointer.active = false; });
  document.addEventListener('visibilitychange', syncAnimation);
  reducedMotion.addEventListener('change', syncAnimation);
  new ResizeObserver(resize).observe(hero);
  new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    if (!inView) pointer.active = false;
    syncAnimation();
  }).observe(hero);
  resize();
  syncAnimation();
})();
