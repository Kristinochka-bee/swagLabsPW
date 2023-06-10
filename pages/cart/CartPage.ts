import {PageObject} from '../PageObject';
import {expect, Locator, Page} from '@playwright/test';

export class CartPage extends PageObject {
  protected readonly continueShoppingButton: Locator;
  protected readonly removeButton: Locator;
  protected readonly checkoutButton: Locator;
  protected readonly yourCartText: Locator;
  protected readonly productsInCart: Locator;
  protected readonly cartsContainer: Locator;
  protected readonly cartItem: Locator;
  protected readonly productsTitle: Locator;


  constructor(page: Page) {
    super(page, '/cart.html');
    this.continueShoppingButton = page.locator('//button[@id="continue-shopping"]');
    this.removeButton = page.locator('//button[@id="remove-sauce-labs-backpack"]');
    this.checkoutButton = page.locator('//button[@id="checkout"]');
    this.yourCartText = page.locator('//span[@class="title"]');
    this.cartsContainer = page.locator('//div[@id=\'cart_contents_container\']');
    this.cartItem = page.locator('//*[@class="cart_item"]');
    this.productsTitle = page.locator('//*[@class="inventory_item_name"]');
    this.productsInCart = this.cartItem.locator('//*[@class="inventory_item_name"]');

  }

  async clickContinueShoppingButton() {
    await this.continueShoppingButton.click();
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }

  async openProductPage(cardName: string) {
    await this.page.locator(`${cardName}`).locator("//div[@class='inventory_item_name']").click();
  }
  async checkYourCartTextIsVisible() {
    await expect(this.yourCartText).toBeVisible();
  }

  async removeProduct(cardName: string) {
    await this.page.locator(`//div[normalize-space()='${cardName}']/ancestor::*[@class="cart_item_label"]`).getByText('Remove').click();
  }

  async getProductTitle() {
    await expect(this.cartItem.first()).toBeVisible();
    return this.productsInCart.allInnerTexts();
  }

}
