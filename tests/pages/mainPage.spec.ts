import test, { Page, Locator, expect } from '@playwright/test';
import { MainPage } from '../models/MainPage';

let mainPage: MainPage;

test.describe('Main Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openMainPage();
  });

  test('Checking if navigation elements are visible in header', async ({}) => {
    await mainPage.checkElementsVisibility();
  });

  test('Checking the name of the header navigation elements', async ({}) => {
    await mainPage.checkElementsText();
  });

  test('Checking href attributes', async ({}) => {
    await mainPage.checkElementsHrefAttribute();
  });

  test('Checking switch to dark mode', async ({}) => {
    await test.step('Press switch to dark mode', async () => {
      await mainPage.clickSwitchLightModeIcon();
    });
    await test.step('Check attribute change', async () => {
      await mainPage.checkDataThemeAttributeValue();
    });
  });

  test(`Checking style of active light mode`, async ({}) => {
    await test.step('Press switch to light mode', async () => {
      await mainPage.setLightMode();
    });
    await test.step('Check attribute change', async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });

  test(`Checking style of active dark mode`, async ({}) => {
    await test.step('Set dark mode', async () => {
      await mainPage.setDarkMode();
    });
    await test.step('Check attribute change', async () => {
      await mainPage.checkLayoutWithDarktMode();
    });
  });
});
