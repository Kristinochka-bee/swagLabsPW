import {Page, test} from '@playwright/test';
import {loginTestHelper, productNames} from '../../../helpers/common';
import {ProductsPage} from '../../../pages/products/ProductsPage';
import {CartPage} from '../../../pages/cart/CartPage';
import {OverviewPage, productPrices} from "../../../pages/overview/OverviewPage";
import {CheckoutPage} from "../../../pages/checkout/CheckoutPage";
import { expect} from '@playwright/test';
import {CompletePage} from "../../../pages/сomplete/CompletePage";

test.describe('Add product in cart and checkout', async () => {
  test('User can add items in cart and checkout', async ({page}) => {
    await loginTestHelper(page, 'standard_user');

    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const overviewPage =  new OverviewPage(page);
    const checkoutPage = new CheckoutPage(page);
    const completePage = new CompletePage(page);

    await productsPage.addToProduct('Sauce Labs Bike Light');
    await productsPage.addToProduct('Sauce Labs Bolt T-Shirt');
    await productsPage.addToProduct('Sauce Labs Onesie');

    await productsPage.clickOnShoppingCartLink();
    await cartPage.removeProduct('Sauce Labs Onesie');
    await cartPage.clickOnCheckoutButton();
    await expect(page).toHaveURL('/checkout-step-one.html');
    await checkoutPage.fillUsersField('Alex', 'Spigel', '44444');
    await checkoutPage.clickOnContinueButton();

    await overviewPage.checkUserOnOverviewPage();
    const actualPriceList = await overviewPage.getItemsPrices();
    await expect(actualPriceList, "Prices list is not equal").toEqual(productPrices);
    await overviewPage.clickOnFinishButton();

    await completePage.takeScreenshotForCheckoutCompleteContainerImage("Thank you for your order!.png");
    await completePage.clickOnBackHomeButton();
  });
});
