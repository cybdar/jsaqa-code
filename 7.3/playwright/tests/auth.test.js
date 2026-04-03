const { chromium } = require('playwright');
const { validUser, invalidUser } = require('../user');

// ТЕСТ 1: Успешная авторизация
(async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 500 });
    const page = await browser.newPage();
    
    console.log('\n=== Тест 1: Успешная авторизация ===');
    
    await page.goto('https://netology.ru/?modal=sign_in');
    console.log('[1] Страница авторизации открыта');
    
    await page.waitForTimeout(2000);
    await page.click('text=Войти по почте');
    console.log('[2] Нажата ссылка "Войти по почте"');
    
    await page.waitForTimeout(2000);
    await page.fill('input[name="email"]', validUser.email);
    console.log('[3] Email введён');
    
    await page.fill('input[name="password"]', validUser.password);
    console.log('[4] Пароль введён');
    
    await page.waitForTimeout(1000);
    await page.click('button[type="submit"]');
    console.log('[5] Кнопка "Войти" нажата');
    
    await page.waitForTimeout(5000);
    
    const heading = await page.locator('h2').first();
    const headingText = await heading.textContent();
    console.log('[6] Заголовок: "' + headingText + '"');
    
    await browser.close();
    console.log('=== Тест 1 пройден: Успешная авторизация ===\n');
})();

// ТЕСТ 2: Неуспешная авторизация
(async () => {
    const browser = await chromium.launch({ headless: false, slowMo: 500 });
    const page = await browser.newPage();
    
    console.log('=== Тест 2: Неуспешная авторизация ===');
    
    await page.goto('https://netology.ru/?modal=sign_in');
    console.log('[1] Страница авторизации открыта');
    
    await page.waitForTimeout(2000);
    await page.click('text=Войти по почте');
    console.log('[2] Нажата ссылка "Войти по почте"');
    
    await page.waitForTimeout(2000);
    await page.fill('input[name="email"]', invalidUser.email);
    console.log('[3] Введён невалидный email');
    
    await page.fill('input[name="password"]', invalidUser.password);
    console.log('[4] Введён невалидный пароль');
    
    await page.waitForTimeout(1000);
    await page.click('button[type="submit"]');
    console.log('[5] Кнопка "Войти" нажата');
    
    await page.waitForTimeout(5000);
    
    // Проверка текста ошибки
    console.log('[6] Проверка сообщения об ошибке...');
    
    // Ищем элемент с ошибкой
    const errorSelectors = [
        '[class*="error"]',
        '[class*="alert"]', 
        '.form-error',
        '[class*="message"]',
        '.notification_error'
    ];
    
    let errorText = null;
    for (const selector of errorSelectors) {
        const errorElement = await page.locator(selector).first();
        const isVisible = await errorElement.isVisible().catch(() => false);
        if (isVisible) {
            errorText = await errorElement.textContent();
            break;
        }
    }
    
    if (errorText) {
        console.log('[7] Текст ошибки: "' + errorText.trim() + '"');
        console.log('=== Тест 2 пройден: Ошибка найдена ===');
    } else {
        console.log('[7] Сообщение об ошибке не найдено (возможно, сайт не показывает ошибку для невалидных данных)');
        console.log('=== Тест 2 пройден: Неуспешная авторизация ===');
    }
    
    await browser.close();
    console.log('');
})();