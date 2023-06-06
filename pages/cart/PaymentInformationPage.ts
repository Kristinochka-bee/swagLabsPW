import {PageObject} from '../PageObject';
import {expect, Locator, Page} from '@playwright/test';

export class PaymentInformationPage extends PageObject {
  protected readonly checkoutOverview: Locator;
  protected readonly totalPriceWithTax: Locator;
  protected readonly cancelButton: Locator;
  protected readonly finishButton: Locator;
  protected readonly totalPrice: Locator;
  protected readonly itemTotal: Locator;

  constructor(page: Page) {
    super(page, '/cart.html');
    this.checkoutOverview = page.getByText('Checkout: Overview');
    this.totalPriceWithTax = page.getByText('Total: $');
    this.cancelButton = page.locator("//button[@id='cancel']");
    this.finishButton = page.locator("//button[@id='finish']");
    this.totalPrice = page.getByText('Item total: $');
    this.itemTotal = page.getByText('Item total: $');
    //inventory_item_name - локатор, по которому можно вытащить текст всех товаров
  }

  async clickCancelButton() {
    await this.cancelButton.click();
  }

  async clickFinishButton() {
    await this.finishButton.click();
  }

  async checkCheckoutOverviewTextIsVisible() {
    await expect(this.checkoutOverview).toBeVisible();
  }
}
