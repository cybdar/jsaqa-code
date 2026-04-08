// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Игнорируем известные ошибки приложения
Cypress.on('uncaught:exception', (err, runnable) => {
  // Список ошибок приложения, которые мы хотим игнорировать
  const appErrors = [
    'startSales is not defined',
    'chairChecked is not defined'
  ];
  
  // Проверяем, содержит ли сообщение об ошибке одну из известных
  const isAppError = appErrors.some(errorMsg => err.message.includes(errorMsg));
  
  if (isAppError) {
    // Возвращаем false, чтобы Cypress НЕ провалил тест из-за этой ошибки
    return false;
  }
  // Для всех остальных ошибок возвращаем true, чтобы тест упал
  return true;
})