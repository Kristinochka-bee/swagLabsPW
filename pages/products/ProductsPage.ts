import {PageObject} from '../PageObject';
import {expect, Locator, Page} from '@playwright/test';

export enum SortOptions {
  A_TO_Z = 'az',
  Z_TO_A = 'za',
  LOW_TO_HIGHT = 'lohi',
  HIGHT_TO_LOW = 'hilo',
}

export const productsSortedBy_A_TO_Z: string[] = [
  'Sauce Labs Backpack',
  'Sauce Labs Bike Light',
  'Sauce Labs Bolt T-Shirt',
  'Sauce Labs Fleece Jacket',
  'Sauce Labs Onesie',
  'Test.allTheThings() T-Shirt (Red)',
];
export const productsSortedBy_Z_TO_A: string[] = [
  'Test.allTheThings() T-Shirt (Red)',
  'Sauce Labs Onesie',
  'Sauce Labs Fleece Jacket',
  'Sauce Labs Bolt T-Shirt',
  'Sauce Labs Bike Light',
  'Sauce Labs Backpack',
];

export class ProductsPage extends PageObject {
  protected readonly pageNameText: Locator;
  protected readonly productsSortContainer: Locator;
  protected readonly shoppingCart: Locator;
  protected readonly productsTitle: Locator;
  protected readonly socialLinks : Locator;

  constructor(page: Page) {
    super(page, '/inventory.html');
    this.pageNameText = page.locator("//span[@class='title']");
    this.productsSortContainer = page.locator("//select[@class='product_sort_container']");
    this.shoppingCart = page.locator('//span[@class="shopping_cart_badge"]');
    this.productsTitle = page.locator('//div[@class="inventory_item_name"]');
    this.socialLinks  = page.locator("//ul[@class='social']//a");
  }

  async openProduct(productName: string) {
    await expect(this.page.locator(`//div[normalize-space()='${productName}']`)).toBeVisible();
    await this.page.locator(`//div[normalize-space()='${productName}']`).click();
  }

  async addToProduct(cardName: string) {
    await this.page.locator(`//div[normalize-space()='${cardName}']/ancestor::*[@class="inventory_item_description"]`).getByText('Add to cart').click();

  }

  async selectSortOption(sortOption: SortOptions) {
    await this.page.locator("//select[@class='product_sort_container']").selectOption(sortOption);
  }

  async clickOnShoppingCartLink() {
    await this.shoppingCart.click();
  }

  async getProductsTitle() {
    await expect(this.productsTitle.first()).toBeVisible();
    return await this.productsTitle.allInnerTexts();
  }

  async getSocialLinks(){
    await this.socialLinks.allInnerTexts();
  }
}
