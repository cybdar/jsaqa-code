const { clickElement, getText, selectSeat, isButtonEnabled } = require("../lib/commands.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
});

afterEach(() => {
  page.close();
});

describe("Бронирование билетов", () => {
  test("Happy Path 1 - Успешное бронирование билета", async () => {
    await clickElement(page, ".page-nav__day:not(.page-nav__day_today)");
    await clickElement(page, ".movie-seances__time");
    await selectSeat(page);
    
    const buttonEnabled = await isButtonEnabled(page, ".acceptin-button");
    expect(buttonEnabled).toBe(true);
    
    await clickElement(page, ".acceptin-button");
    
    await page.waitForSelector(".ticket__check-title", { timeout: 10000 });
    const confirmTitle = await getText(page, ".ticket__check-title");
    expect(confirmTitle).toContain("Вы выбрали билеты");
    
    await clickElement(page, ".acceptin-button");
    
    await page.waitForSelector(".ticket__check-title", { timeout: 10000 });
    const ticketTitle = await getText(page, ".ticket__check-title");
    expect(ticketTitle).toContain("Электронный билет");
  });

  test("Happy Path 2 - После выбора места кнопка активна", async () => {
    await clickElement(page, ".page-nav__day:not(.page-nav__day_today)");
    await clickElement(page, ".movie-seances__time");
    await selectSeat(page);
    
    const buttonEnabled = await isButtonEnabled(page, ".acceptin-button");
    expect(buttonEnabled).toBe(true);
  });

  test("Sad Path - Без выбора места кнопка неактивна", async () => {
    await clickElement(page, ".page-nav__day:not(.page-nav__day_today)");
    await clickElement(page, ".movie-seances__time");
    
    const buttonEnabled = await isButtonEnabled(page, ".acceptin-button");
    expect(buttonEnabled).toBe(false);
  });
});
