import {PageObject} from '../PageObject';
import {expect, Locator, Page} from '@playwright/test';

export class PaymentDataPage extends PageObject {
  protected readonly checkoutInformation: Locator;
  protected readonly firstNameField: Locator;
  protected readonly lastNameField: Locator;
  protected readonly postCodeField: Locator;
  protected readonly cancelButton: Locator;
  protected readonly continueButton: Locator;

  constructor(page: Page) {
    super(page, '/cart.html');
    this.checkoutInformation = page.getByText('Checkout: Your Information');
    this.firstNameField = page.locator("//input[@id='first-name']");
    this.lastNameField = page.locator("//input[@id='last-name']");
    this.postCodeField = page.locator("//input[@id='postal-code']");
    this.cancelButton = page.locator("//button[@id='cancel']");
    this.continueButton = page.locator("//input[@id='continue']");
  }

  async clickCancelButton() {
    await this.cancelButton.click();
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }

  async checkoutInformationFormIsVisible() {
    await expect(this.checkoutInformation).toBeVisible();
  }

  async fillInformationFields(firstName: string = 'Leo', lastName: string = 'Mikhailov', postCode: string = '123') {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.postCodeField.fill(postCode);
  }
}
