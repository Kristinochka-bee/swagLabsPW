import {expect, Locator, Page} from '@playwright/test';
import {PageObject} from '../PageObject';
export class CompletePage extends PageObject {
  protected readonly backHomeButton: Locator;
  protected readonly thanksText: Locator;
  constructor(page: Page) {
    super(page, 'checkout-complete.html');
    this.backHomeButton = page.locator('//button[@id="back-to-products"]');
    this.thanksText = page.locator('//h2[normalize-space()="Thank you for your order!"]');
  }
  async clickBackHomeButton() {
    await this.backHomeButton.click();
  }

  async thanksTextIsVisible() {
    await expect(this.thanksText).toBeVisible();
  }
}
