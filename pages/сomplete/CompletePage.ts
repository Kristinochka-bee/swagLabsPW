import {PageObject} from "../PageObject";
import {Locator, Page} from '@playwright/test';
import {takeScreenshotOfElement} from "../../helpers/common";

export class CompletePage extends PageObject {
    protected readonly backHomeButton: Locator;
    protected readonly checkoutCompleteContainer: Locator;

    constructor(page: Page) {
        super(page, '/');
        this.backHomeButton = page.locator("//button[@id='back-to-products']");
        this.checkoutCompleteContainer = page.locator("//div[@id='checkout_complete_container']");
    }

    async takeScreenshotForCheckoutCompleteContainerImage(fileName: string) {
        await takeScreenshotOfElement(this.checkoutCompleteContainer, fileName);
    }
    async clickOnBackHomeButton(){
        await this.backHomeButton.click();
    }


}






