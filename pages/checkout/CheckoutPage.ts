import {PageObject} from '../PageObject';
import {Locator, Page} from '@playwright/test';

export class CheckoutPage extends PageObject {
  protected readonly firstNameField: Locator;
  protected readonly lastNameField: Locator;
  protected readonly zipPostalCodeField: Locator;
  protected readonly continueButton: Locator;
  protected readonly checkoutYourInformation: Locator;

  constructor(page: Page) {
    super(page, '/checkout-step-one.html');
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.zipPostalCodeField = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', {name:'Continue'});
  }

  async fillUsersField(firstName: string, lastName: string, zipPostal: string) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.zipPostalCodeField.fill(zipPostal);
  }

  async clickOnContinueButton() {
    await this.continueButton.click();
  }
}
