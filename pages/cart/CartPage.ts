import {PageObject} from '../PageObject';
import {expect, Locator, Page} from '@playwright/test';

export class CartPage extends PageObject {
  protected readonly continueShoppingButton: Locator;
  protected readonly removeButton: Locator;
  protected readonly checkoutButton: Locator;
  protected readonly yourCartText: Locator;
  protected readonly productsInCart: Locator;
  protected readonly cartsContainer: Locator;

  constructor(page: Page) {
    super(page, '/cart.html');
    this.continueShoppingButton = page.locator('//button[@id=continue-shopping]');
    this.removeButton = page.locator('//button[@id=remove-sauce-labs-backpack]');
    this.checkoutButton = page.locator('//button[@id=checkout]');
    this.yourCartText = page.locator('//span[@class=title]');
    this.cartsContainer = page.locator('//div[@id=\'cart_contents_container\']');
    this.productsInCart = this.cartsContainer.locator('//*[@class=inventory_item_name]');
  }

  async clickContinueShoppingButton() {
    await this.continueShoppingButton.click();
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }
  async checkYourCartTextIsVisible() {
    await expect(this.yourCartText).toBeVisible();
  }

  async removeProduct(cardName: string) {
    await this.page.locator(`//div[normalize-space()='${cardName}']/ancestor::*[@class="cart_item_label"]`).getByText('Remove').click();
  }

  async getProductTitle() {
    await expect(this.cartsContainer).toBeVisible();
    return this.productsInCart.allInnerTexts();
  }


}
