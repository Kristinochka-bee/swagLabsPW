import {PageObject} from '../PageObject';
import {Locator, Page} from '@playwright/test';

export const productPrices: string[] = [
  '$9.99',
  '$15.99'
];

export class OverviewPage extends PageObject {
  protected readonly overviewTitle: Locator;
  protected readonly itemTotal: Locator;
  protected readonly taxItem: Locator;
  protected readonly total: Locator;
  protected readonly finishButton: Locator;
  protected readonly cancelButton: Locator;
  protected readonly itemsPrice: Locator;
  constructor(page: Page) {
    super(page, '/');
    this.overviewTitle = page.locator("//span[@class='title']");
    this.itemTotal = page.locator("//div[@class='summary_subtotal_label']");
    this.taxItem = page.locator("//div[@class='summary_tax_label']");
    this.total = page.locator("//div[@class='summary_info_label summary_total_label']");
    this.cancelButton = page.locator("//button[@id='cancel']");
    this.itemsPrice = page.locator('//*[@class="inventory_item_price"]');
    this.finishButton = page.locator('//button[@id="finish"]');
  }
  async checkUserOnOverviewPage() {
    await this.overviewTitle.isVisible();
  }

  async clickOnFinishButton() {
    await this.finishButton.click();
  }

  async clickOnCancelButton() {
    await this.cancelButton.click();
  }

  async getItemsPrices(){
    return await this.itemsPrice.allInnerTexts();
  }

}
