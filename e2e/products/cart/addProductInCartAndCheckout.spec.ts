import {Page, test} from '@playwright/test';
import {loginTestHelper, productNames} from '../../../helpers/common';
import {ProductsPage} from '../../../pages/products/ProductsPage';
import {CartPage} from '../../../pages/cart/CartPage';
import {OverviewPage, productPrices} from "../../../pages/overview/OverviewPage";
import {CheckoutPage} from "../../../pages/checkout/CheckoutPage";
import { expect} from '@playwright/test';
import {CompletePage} from "../../../pages/сomplete/CompletePage";
import {faker} from "@faker-js/faker";

test.describe('Add product in cart and checkout', async () => {
  test('User can add items in cart and checkout', async ({page}) => {
    const firstName= faker.name.firstName();
    const lastName= faker.name.lastName();
    const postCode= faker.address.zipCode();

    await loginTestHelper(page, 'standard_user');

    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const overviewPage =  new OverviewPage(page);
    const checkoutPage = new CheckoutPage(page);
    const completePage = new CompletePage(page);

    //for (let i= 0; i < 3; i++ ){
    //  await productsPage.addToProduct(productNames[i]);
    //}
    await productsPage.addToProduct(productNames[1]);
    await productsPage.addToProduct(productNames[2]);
    await productsPage.addToProduct(productNames[4]);

    await productsPage.clickOnShoppingCartLink();
    await expect(await cartPage.getProductTitle()).toEqual([productNames[1],productNames[2],productNames[4]]);
    await cartPage.removeProduct(productNames[4]);
    await expect(await cartPage.getProductTitle()).toEqual([productNames[1],productNames[2]]);

    await cartPage.clickOnCheckoutButton();
    await expect(page).toHaveURL('/checkout-step-one.html');
    await checkoutPage.fillUsersField(firstName,lastName, postCode);
    await checkoutPage.clickOnContinueButton();

    await overviewPage.checkUserOnOverviewPage();
    const actualPriceList = await overviewPage.getItemsPrices();
    await expect(actualPriceList, "Prices list is not equal").toEqual(productPrices);
    await overviewPage.clickOnFinishButton();

    await completePage.takeScreenshotForCheckoutCompleteContainerImage("Thank you for your order!.png");
    await completePage.clickOnBackHomeButton();
  });
});
