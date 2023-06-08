import {PageObject} from '../PageObject';
import {expect, Locator, Page} from '@playwright/test';

export class CartPage extends PageObject {
  protected readonly continueShoppingButton: Locator;
  protected readonly checkoutButton: Locator;
  protected readonly removeButton: Locator;
  protected readonly productsTitle: Locator;
  protected readonly cartItem: Locator;


  constructor(page: Page) {
    super(page, '/');
    this.continueShoppingButton = page.locator("//button[@id='continue-shopping']");
    this.checkoutButton = page.locator("//button[@id='checkout']");
    this.removeButton = page.locator("//button[@id='remove-sauce-labs-backpack']");
    this.productsTitle = page.locator('//div[@class="inventory_item_name"]');
    this.cartItem = page.locator('//*[@class="cart_item"]');

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
  async getProductsTitleByIndex(remove ?:boolean | undefined) {
    let arr = [];
    await expect(this.productsTitle.first()).toBeVisible();
    if (remove){
      const title1 =  await this.productsTitle.nth(1).innerText();
      const title2 = await this.productsTitle.nth(2).innerText();
      arr.push(title1, title2);

    }else {
      const title1 =  await this.productsTitle.nth(1).innerText();
      const title2 = await this.productsTitle.nth(2).innerText();
      const title3 = await this.productsTitle.nth(4).innerText();
      arr.push(title1, title2, title3);

    }
    return arr;
  }

//this.productsInCart = this.cartItem.locator('//*[@class="inventory_item_name"]');

}
