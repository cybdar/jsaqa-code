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

describe("GitHub main page tests", () => {
  
  beforeEach(async () => {
    await page.goto("https://github.com");
  });

  test("Page title should contain 'GitHub'", async () => {
    const actual = await page.title();
    expect(actual).toContain("GitHub");
  }, 30000);

  test("Sign up button should exist", async () => {
    await page.waitForSelector('a[href*="signup"]');
    const actual = await page.$eval('a[href*="signup"]', link => link.textContent);
    expect(actual).toContain("Sign up");
  }, 20000);

  test("Click on Sign up leads to signup page", async () => {
    await page.click('a[href*="signup"]');
    await page.waitForSelector('h1');
    const actual = await page.title();
    expect(actual).toContain("GitHub");
  }, 25000);
});

test("Features page title should contain 'Features'", async () => {
  await page.goto("https://github.com/features");
  await page.waitForSelector('h1');
  const actual = await page.title();
  expect(actual).toContain("Features");
}, 20000);

test("Pricing page title should contain 'Pricing'", async () => {
  await page.goto("https://github.com/pricing");
  await page.waitForSelector('h1');
  const actual = await page.title();
  expect(actual).toContain("Pricing");
}, 20000);

test("About page title should contain 'About'", async () => {
  await page.goto("https://github.com/about");
  await page.waitForSelector('h1');
  const actual = await page.title();
  expect(actual).toContain("About");
}, 20000);