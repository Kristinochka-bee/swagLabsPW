import {expect, test} from '@playwright/test';
import {loginTestHelper, productNames, productNamesAfterRemoveIndex1} from '../../helpers/common';
import {ProductsPage} from '../../pages/products/ProductsPage';
import {ProductPage} from '../../pages/products/ProductPage';
import {CartPage} from '../../pages/cart/CartPage';
import {PaymentDataPage} from '../../pages/cart/PaymentDataPage';
import {PaymentInformationPage} from '../../pages/cart/PaymentInformationPage';

test.describe('User can add items in cart, delete items and buy products', async () => {
  test('User can buy products', async ({page}) => {
    await loginTestHelper(page, 'standard_user');

    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    for (let productName of productNames) {
      await productsPage.addToProduct(productName);
    }
    await productsPage.goToCart();
    await expect(await cartPage.getProductTitle(), 'Product title is not correct').toEqual(productNames);
    await cartPage.removeProduct('Sauce Labs Bike Light');
    await expect(await cartPage.getProductTitle(), 'Product title is not correct').toEqual(
      productNamesAfterRemoveIndex1
    );
    await cartPage.clickContinueShoppingButton();
    const paymentDataPage = new PaymentDataPage(page);
    await paymentDataPage.checkoutInformationFormIsVisible();
    await paymentDataPage.fillInformationFields();
    await paymentDataPage.clickContinueButton();

    const paymentInformationPage = new PaymentInformationPage(page);
    await paymentInformationPage.clickFinishButton();
  });
});
