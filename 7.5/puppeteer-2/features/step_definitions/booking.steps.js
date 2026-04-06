const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { clickElement, getText, selectSeat, isButtonEnabled } = require("../../lib/commands.js");

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on main page", async function () {
  return await this.page.goto("http://qamid.tmweb.ru/client/index.php", {
    setTimeout: 20000,
  });
});

When("user selects a day", async function () {
  return await clickElement(this.page, ".page-nav__day:not(.page-nav__day_today)");
});

When("user selects a session", async function () {
  return await clickElement(this.page, ".movie-seances__time");
});

When("user selects an available seat", async function () {
  return await selectSeat(this.page);
});

When("user clicks booking button", async function () {
  return await clickElement(this.page, ".acceptin-button");
});

When("user clicks get code button", async function () {
  return await clickElement(this.page, ".acceptin-button");
});

Then("booking button is enabled", async function () {
  const enabled = await isButtonEnabled(this.page, ".acceptin-button");
  expect(enabled).to.be.true;
});

Then("booking button is disabled", async function () {
  const enabled = await isButtonEnabled(this.page, ".acceptin-button");
  expect(enabled).to.be.false;
});

Then("confirmation page is displayed", async function () {
  await this.page.waitForSelector(".ticket__check-title");
  const title = await getText(this.page, ".ticket__check-title");
  expect(title).to.contains("Вы выбрали билеты:");
});

Then("electronic ticket is displayed", async function () {
  await this.page.waitForSelector(".ticket__check-title");
  const title = await getText(this.page, ".ticket__check-title");
  expect(title).to.contains("Электронный билет");
});
