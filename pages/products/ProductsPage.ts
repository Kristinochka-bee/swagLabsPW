import {PageObject} from '../PageObject';
import {expect, Locator, Page} from '@playwright/test';

export enum SortOptions {
  A_TO_Z = 'az',
  Z_TO_A = 'za',
  LOW_TO_HIGHT = 'lohi',
  HIGHT_TO_LOW = 'hilo',
}

export class ProductsPage extends PageObject {
  protected readonly pageNameText: Locator;
  protected readonly productsSortContainer: Locator;
  protected readonly shoppingCart: Locator;

  constructor(page: Page) {
    super(page, '/inventory.html');
    this.pageNameText = page.locator("//span[@class='title']");
    this.productsSortContainer = page.locator("//select[@class='product_sort_container']");
    this.shoppingCart = page.locator('class="shopping_cart_link"');
  }

  async openProduct(productName: string) {
    await expect(this.page.locator(`//div[normalize-space()='${productName}']`)).toBeVisible();
    await this.page.locator(`//div[normalize-space()='${productName}']`).click();
  }

  async addToProduct(cardName: string) {
    await this.page.locator(`//div[normalize-space()='${cardName}']`).locator('Add to cart').click();
  }

  async selectSortOption(sortOption: SortOptions) {
    await this.page.locator("//select[@class='product_sort_container']").selectOption(sortOption);
  }
}
