import {PageObject} from '../PageObject';
import {expect, Locator, Page} from '@playwright/test';

export class CartPage extends PageObject {
  protected readonly continueShoppingButton: Locator;
  protected readonly checkoutButton: Locator;
  protected readonly removeButton: Locator;
  protected readonly productsTitle: Locator;
  protected readonly cartItem: Locator;
  protected readonly productsInCart:Locator;


  constructor(page: Page) {
    super(page, '/');
    this.continueShoppingButton = page.locator("//button[@id='continue-shopping']");
    this.checkoutButton = page.locator("//button[@id='checkout']");
    this.removeButton = page.locator("//button[@id='remove-sauce-labs-backpack']");
    this.productsTitle = page.locator('//*[@class="inventory_item_name"]');
    this.cartItem = page.locator('//*[@class="cart_item"]');
    this.productsInCart = this.cartItem.locator('//*[@class="inventory_item_name"]');


  }

  async removeProduct(cardName: string) {
    await this.page.locator(`//div[normalize-space()='${cardName}']/ancestor::*[@class="cart_item_label"]`).getByText('Remove').click();
  }

  async openProductPage(cardName: string) {
    await this.page.locator(`${cardName}`).locator("//div[@class='inventory_item_name']").click();
  }
  async clickOnCheckoutButton() {
    await this.checkoutButton.click();
  }

  async getProductTitle() {
    await expect(this.cartItem.first()).toBeVisible();
    return this.productsInCart.allInnerTexts();
  }

//this.productsInCart = this.cartItem.locator('//*[@class="inventory_item_name"]');

}
