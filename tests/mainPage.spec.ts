import { test, expect } from '@playwright/test';
import { link } from 'fs';
import { text } from 'stream/consumers';

const elements = [
  {
    locator: (page) => page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo',
    text: 'Playwright',
  },
  {
    locator: (page) => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs link',
    text: 'Docs',
  },
  {
    locator: (page) => page.getByRole('link', { name: 'API' }),
    name: 'API link',
    text: 'API',
  },
  {
    locator: (page) => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js version',
    text: 'Node.js',
  },
  {
    locator: (page) => page.getByRole('link', { name: 'Community' }),
    name: 'Community link',
    text: 'Community',
  },
  {
    locator: (page) => page.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub',
  },
  {
    locator: (page) => page.getByRole('link', { name: 'Discord server' }),
    name: 'Discord',
  },
  {
    locator: (page) => page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'Theme switcher',
  },
  {
    locator: (page) => page.getByRole('button', { name: 'Search (Command+K)' }),
    name: 'Search bar',
  },
];

test.describe('Main Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });
  test('Check if navigation elements are visible in header', async ({ page }) => {
    for (const { locator, name } of elements) {
      await test.step(`Check visibility of ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    }
  });

  test('Checking the name of the header navigation elements', async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      if (text) {
        test.step(`Check element name ${name}`, async () => {
          await expect(locator(page)).toContainText(text);
        });
      }
    });
  });

  test('Checking href attributes', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toHaveAttribute(
      'href',
      '/',
    );

    await expect(page.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs/intro');
    await expect(page.getByRole('link', { name: 'API' })).toHaveAttribute(
      'href',
      '/docs/api/class-playwright',
    );
    await expect(page.getByRole('link', { name: 'Community' })).toHaveAttribute(
      'href',
      '/community/welcome',
    );
    await expect(page.getByRole('link', { name: 'GitHub repository' })).toHaveAttribute(
      'href',
      'https://github.com/microsoft/playwright',
    );
    await expect(page.getByRole('link', { name: 'Discord server' })).toHaveAttribute(
      'href',
      'https://aka.ms/playwright/discord',
    );
  });

  test('Checking switch to dark mode', async ({ page }) => {
    await page.getByTitle('system mode').click();
    await page.getByTitle('light mode').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('Checking page title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText(
      'Playwright enables reliable end-to-end testing for modern web apps.',
    );
  });

  test('Checking Get Intro button', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
    await expect(page.getByRole('banner')).toContainText('Get started');
    await expect(page.getByRole('link', { name: 'Get started' })).toHaveAttribute(
      'href',
      '/docs/intro',
    );
  });
});
