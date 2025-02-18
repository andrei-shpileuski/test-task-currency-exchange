# Starter Project for the Test Task | Стартовый проект для тестового задания

[English](#project-overview) | [Русский](#описание-проекта)  
[Donate](#-welcome-guest) | [Респектнуть](#-добро-пожаловать-гость)

---

## Project Overview

This project serves as a starter template for completing technical assignments without specific design requirements when applying for a job.

![OG](./public/images/metadata/og-image-en.webp)
![Lighthouse](./public/images/lighthouse/lighthouse.webp)

### Architecture
- **Monolithic**

### Stack & Technologies
- **Angular 19** (Core, Forms, Router, Material, CDK, SSR)
- **NgRx Signals** - State management
- **ngx-translate** - Internationalization
- **Express** - Backend server for SSR
- **RxJS** - Reactive programming
- **ESLint** - Code linting

## How to Run the Project

1. **Clone the repository:**
   ```sh
   git clone https://github.com/andrei-shpileuski/test-task-monolith.git
   cd test-task-monolith
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run the development server:**
   ```sh
   npm run dev:ssr
   ```

## Important Notes
### Experimental Feature
- `provideExperimentalZonelessChangeDetection`

### SSR-Safe Services
- Locale storage - `src/app/core/data-access/browser/local-storage.service.ts`
- Session Storage - `src/app/core/data-access/browser/session-storage.service.ts`
- Document - `src/app/core/data-access/browser/document.service.ts`
- Window - `src/app/core/data-access/browser/window.service.ts`

## Changing the Default Language
Update `src/app/core/entities/constants/default-language.const.ts`:
```ts
export const defaultLanguage: LanguagesISOEnum = LanguagesISOEnum.Russian;
```

## Personalizing the Project
- **Author details:** `public/data/author.json`
- **Job information:** `public/data/vacancy.json`
- **Task details:** `public/data/task.json`
- **Solution details:** `public/data/solution.json`

### Updating Metadata & Assets
- OG images: `public/images/metadata/og-image-en.jpg`, `public/images/metadata/og-image-ru.jpg`
- Favicon: `public/favicon.ico`

## Implementing Your Test Solution
Place your solution in:
`src/app/domain/features/solution`

---

## 🎉 Welcome, Guest!

If you found this project useful and want to support my work, consider checking out my Boosty page!

👉 Support me on [Boosty](https://boosty.to/andrei-shpileuski/donate)

Your support helps me create more open-source projects and share valuable knowledge with the community. Thanks a lot! 🙌

---

# Описание проекта

Этот проект служит стартовым шаблоном для выполнения технических заданий без конкретных требований к дизайну при подаче заявки на работу.

![OG](./public/images/metadata/og-image-ru.webp)
![Lighthouse](./public/images/lighthouse/lighthouse.webp)

### Архитектура
- **Монолитная**

### Стек и технологии
- **Angular 19** (Core, Forms, Router, Material, CDK, SSR)
- **NgRx Signals** – управление состоянием
- **ngx-translate** – мультиязычность
- **Express** – серверная часть
- **RxJS** – реактивное программирование
- **ESLint** – линтинг кода

## Запуск проекта

1. **Клонировать репозиторий:**
   ```sh
   git clone https://github.com/andrei-shpileuski/test-task-monolith.git
   cd test-task-monolith
   ```
2. **Установить зависимости:**
   ```sh
   npm install
   ```
3. **Запустить сервер разработки:**
   ```sh
   npm run dev:ssr
   ```

## Важно
### Экспериментальная фича
- `provideExperimentalZonelessChangeDetection`

### Сервисы для безопасной работы с SSR
- Locale storage - `src/app/core/data-access/browser/local-storage.service.ts`
- Session Storage - `src/app/core/data-access/browser/session-storage.service.ts`
- Document - `src/app/core/data-access/browser/document.service.ts`
- Window - `src/app/core/data-access/browser/window.service.ts`

## Смена языка по умолчанию
Измените `src/app/core/entities/constants/default-language.const.ts`:
```ts
export const defaultLanguage: LanguagesISOEnum = LanguagesISOEnum.Russian;
```

## Заполнение данных
- **Об авторе:** `public/data/author.json`
- **О вакансии:** `public/data/vacancy.json`
- **О задаче:** `public/data/task.json`
- **О решении:** `public/data/solution.json`

### Замена метаданных и ресурсов
- OG-изображения: `public/images/metadata/og-image-en.jpg`, `public/images/metadata/og-image-ru.jpg`
- Фавикон: `public/favicon.ico`

## Размещение решения тестового задания
Разместите решение в:
`src/app/domain/features/solution`

---

## 🎉 Добро пожаловать, гость!

Если проект оказался полезным и ты хочешь поддержать мою работу, загляни на мой Boosty!

👉 Поддержать на [Boosty](https://boosty.to/andrei-shpileuski/donate)

Твоя поддержка помогает мне создавать больше крутых проектов и делиться знаниями с сообществом. Спасибо! 🙌
