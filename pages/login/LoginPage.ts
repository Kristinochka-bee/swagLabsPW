import {expect, Locator, Page} from '@playwright/test';
import {PageObject} from '../PageObject';
import {takeScreenshotOfElement} from '../../helpers/common';

export const defaultPassword = 'secret_sauce';

export class LoginPage extends PageObject {
  protected readonly usernameField: Locator;
  protected readonly passwordField: Locator;
  protected readonly loginButton: Locator;
  protected readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page, '/');
    // this.titleSwagLabs = page.getByText('Swag Labs');
    this.usernameField = page.locator('//*[@id="user-name"]');
    this.passwordField = page.locator('//*[@id="password"]');
    // this.passwordField = page.getByPlaceholder('Password');
    this.loginButton = page.locator('//*[@id="login-button"]');
    // this.loginButton = page.getByRole('button', {name: 'Login'});
    this.errorMessage = page.locator('//*[@data-test="error"]');
  }

  async fillLoginForm(username: string, password: string = 'secret_sauce') {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
  }

  async clickOnLoginButton() {
    await this.loginButton.click({timeout: 10000});
  }

  async checkSuccessLogin() {
    await expect(this.usernameField).not.toBeVisible();
    await expect(this.passwordField).not.toBeVisible();
    await expect(this.loginButton).not.toBeVisible();
  }

  async checkNotSuccessLogin() {
    await expect(this.usernameField).toBeVisible();
    await expect(this.passwordField).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async takeScreenshotForErrorMessage(fileName: string) {
    await takeScreenshotOfElement(this.errorMessage, fileName);
  }
}
