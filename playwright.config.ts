import {defineConfig} from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  /* Run tests in files in parallel */
  timeout: 180 * 1000,
  expect: {
    timeout: 10000,
  },
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    actionTimeout: 5000,
    baseURL: 'https://www.saucedemo.com',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'local chromium',
      use: {
        viewport: {width: 1920, height: 1080},
        browserName: 'chromium',
        video: 'on',
        trace: 'on',
        screenshot: 'on',
        headless: true,
        launchOptions: {
          slowMo: 0,
        },
      },
    },

    {
      name: 'local firefox',
      use: {
        viewport: {width: 1920, height: 1080},
        browserName: 'firefox',
        video: 'on',
        trace: 'on',
        screenshot: 'on',
        headless: false,
        launchOptions: {
          slowMo: 0,
        },
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
