import {PageObject} from '../PageObject';
import {Locator, Page} from '@playwright/test';
import { expect} from '@playwright/test';

export class CartPage extends PageObject {
  protected readonly continueShoppingButton: Locator;
  protected readonly checkoutButton: Locator;
  protected readonly removeButton: Locator;
  protected readonly yourCartTitle: Locator;

  constructor(page: Page) {
    super(page, '/');
    this.continueShoppingButton = page.locator("//button[@id='continue-shopping']");
    this.checkoutButton = page.locator("//button[@id='checkout']");
    this.removeButton = page.locator("//button[@id='remove-sauce-labs-backpack']");
  }

  async removeProduct(cardName: string) {
    await this.page.locator(`${cardName}`).locator('Remove').click();
  }

  async openProductPage(cardName: string) {
    await this.page.locator(`${cardName}`).locator("//div[@class='inventory_item_name']").click();
  }
  async clickOnCheckoutButton() {
    await this.checkoutButton.click();
  }

  async checkUserOnCartPage() {
    await this.yourCartTitle.isVisible();
  }
}
