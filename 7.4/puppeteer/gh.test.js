const puppeteer = require("puppeteer");

let page;
let browser;

beforeAll(async () => {
  browser = await puppeteer.launch();
});

afterAll(async () => {
  await browser.close();
});

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(async () => {
  await page.close();
});

test("Page title should contain 'GitHub'", async () => {
  await page.goto("https://github.com");
  const actual = await page.title();
  expect(actual).toContain("GitHub");
}, 30000);

test("Sign up button should exist", async () => {
  await page.goto("https://github.com");
  await page.waitForSelector('a[href*="signup"]');
  const actual = await page.$eval('a[href*="signup"]', link => link.textContent);
  expect(actual).toContain("Sign up");
}, 20000);

test("Click on Sign up leads to signup page", async () => {
  await page.goto("https://github.com");
  await page.click('a[href*="signup"]');
  await page.waitForSelector('h1');
  const actual = await page.title();
  expect(actual).toContain("GitHub");
}, 25000);