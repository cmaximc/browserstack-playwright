import { test, Page, expect } from '@playwright/test';

let page: Page;

const urls = [
  'https://www.ah.nl',
  'https://www.ah.nl/allerhande',
  'https://www.ah.nl/bonus/bier-aanbiedingen',
  'https://www.ah.nl/bonus/folder/bonus-kerst-folder',
  'https://www.ah.nl/bonus/gratis-bezorging',
  'https://www.ah.nl/producten',
  'https://www.ah.nl/bonus'
];

test.describe("AH web page", () => {
  test.setTimeout(180000)
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  urls.forEach(url => {
    const testName = url.replace('https://tst.ah.nl/', '');
    test(`Playwright visits ${testName}`, async () => {
      console.log('trying this url: ' + url);
      await page.goto(url, { waitUntil: 'commit' });
      try {
        const xpath = '//button[@id="accept-cookies"]';
        await page.waitForSelector(xpath, { timeout: 5000 });
        await page.click(xpath);
        console.log('Clicked the accept cookies button');

      } catch (error) {
        console.log('Accept cookies button did not appear');
      }
    });
  });

});