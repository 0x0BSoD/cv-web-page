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
})();
