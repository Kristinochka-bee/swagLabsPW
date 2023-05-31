import {PageObject} from "../PageObject";
import {Locator, Page} from "@playwright/test";

export class PaymentDataPage extends PageObject {
    protected readonly checkoutOverview: Locator;
    protected readonly totalPriceWithTax: Locator;
    protected readonly cancelButton: Locator;
    protected readonly finishButton: Locator;
    protected readonly itemTotalPrice: Locator;

    constructor(page: Page) {
        super(page, '/cart.html');
        this.checkoutOverview = page.getByText('Checkout: Overview');
        this.totalPriceWithTax = page.getByText('Total: $');
        this.cancelButton = page.locator('//button[@id=\'cancel\']');
        this.finishButton = page.locator('//button[@id=\'finish\']');
        this.itemTotalPrice = page.getByText('Item total: $');
    }


}