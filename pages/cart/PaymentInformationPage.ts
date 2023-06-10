import {PageObject} from '../PageObject';
import {expect, Locator, Page} from '@playwright/test';

export class PaymentInformationPage extends PageObject {
  protected readonly checkoutOverview: Locator;
  protected readonly totalPriceWithTax: Locator;
  protected readonly cancelButton: Locator;
  protected readonly finishButton: Locator;
  protected readonly totalPrice: Locator;
  protected readonly itemTotal: Locator;
  protected readonly cartItem: Locator;
  protected readonly prices: Locator;
  protected readonly tax: Locator;
  protected readonly totalWithTax: Locator;

  constructor(page: Page) {
    super(page, '/cart.html');
    this.checkoutOverview = page.getByText('Checkout: Overview');
    this.totalPriceWithTax = page.getByText('Total: $');
    this.cancelButton = page.locator("//button[@id='cancel']");
    this.finishButton = page.locator("//button[@id='finish']");
    this.totalPrice = page.getByText('Item total: $');
    this.itemTotal = page.getByText('Item total: $');
    this.cartItem = page.locator('//*[@class="cart_item"]');
    this.prices = this.cartItem.locator('//*[@class="inventory_item_price"]');
    this.tax = page.locator('//div[@class="summary_tax_label"]');
    this.totalWithTax = page.locator("//div[@class='summary_info_label summary_total_label']");
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

  async getProductPrice() {
    await expect(this.cartItem.first()).toBeVisible();
    return this.prices.allInnerTexts();
  }
  async getSumOfPrices() {
    const prices = await this.getProductPrice();
    let totalSum = 0;
    for (const price of prices) {
      const priceWithoutDollar = Number(price.slice(1));
      totalSum += priceWithoutDollar;
    }
    return totalSum;
  }

  async getItemTotalPrice() {
    const priceLikeTextWithDollar = await this.itemTotal.innerText();
    return Number(priceLikeTextWithDollar.slice(1));
  }

  async getTax() {
    const taxWithDollar = await this.tax.innerText();
    return Number(taxWithDollar.slice(1));
  }

  async getTotalWithTax() {
    const totalWithDollar = await this.totalWithTax.innerText();
    return Number(totalWithDollar.slice(1));
  }

  async countItemTotalWithoutTaxPlusTax() {
    return (await this.getItemTotalPrice()) + (await this.getTax());
  }
}
