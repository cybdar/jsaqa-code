module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },

  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },

  selectSeat: async function (page) {
    try {
      await page.waitForSelector('.buying-scheme__chair:not(.buying-scheme__chair_taken):not(.buying-scheme__chair_disabled)');
      await page.click('.buying-scheme__chair:not(.buying-scheme__chair_taken):not(.buying-scheme__chair_disabled)');
    } catch (error) {
      throw new Error(`Seat is not selectable`);
    }
  },

  isButtonEnabled: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      const isDisabled = await page.$eval(selector, (btn) => btn.disabled);
      return !isDisabled;
    } catch (error) {
      throw new Error(`Button is not available: ${selector}`);
    }
  }
};
