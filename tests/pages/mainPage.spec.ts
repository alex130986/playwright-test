import {test, expect} from '../fixtures/mainPage';
import { MainPage } from '../models/MainPage';

test.describe('Main Page Tests', () => {

  test('Checking if navigation elements are visible in header', async ({mainPage}) => {
    await mainPage.checkElementsVisibility();
  });

  test('Checking the name of the header navigation elements', async ({mainPage}) => {
    await mainPage.checkElementsText();
  });

  test('Checking href attributes', async ({mainPage}) => {
    await mainPage.checkElementsHrefAttribute();
  });

  test('Checking switch to dark mode', async ({mainPage}) => {
    await test.step('Press switch to dark mode', async () => {
      await mainPage.clickSwitchLightModeIcon();
    });
    await test.step('Check attribute change', async () => {
      await mainPage.checkDataThemeAttributeValue();
    });
  });

  test(`Checking style of active light mode`, async ({mainPage}) => {
    await test.step('Press switch to light mode', async () => {
      await mainPage.setLightMode();
    });
    await test.step('Check attribute change', async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });

  test(`Checking style of active dark mode`, async ({mainPage}) => {
    await test.step('Set dark mode', async () => {
      await mainPage.setDarkMode();
    });
    await test.step('Check attribute change', async () => {
      await mainPage.checkLayoutWithDarktMode();
    });
  });
});
