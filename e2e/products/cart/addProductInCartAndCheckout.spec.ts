import {Page, test} from '@playwright/test';
import {loginTestHelper, productNames} from '../../../helpers/common';
import {ProductsPage} from '../../../pages/products/ProductsPage';
import {CartPage} from '../../../pages/cart/CartPage';

test.describe('Add product in cart and checkout', async () => {
  test('User can add items in cart and checkout', async ({page}) => {
    await loginTestHelper(page, 'standard_user');

    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    //const checkoutPage = new CheckoutPage(page);

    await productsPage.addToProduct('Sauce Labs Bike Light');
    await productsPage.addToProduct('Sauce Labs Bolt T-Shirt');
    await productsPage.addToProduct('Sauce Labs Onesie');

    await productsPage.clickOnShoppingCartLink();
    await cartPage.removeProduct('Sauce Labs Onesie');
    await cartPage.clickOnCheckoutButton();
  });
});
