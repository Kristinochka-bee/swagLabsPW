import {expect, test} from "@playwright/test";
import {loginTestHelper, productNames} from "../../../helpers/common";
import {ProductsPage} from "../../../pages/products/ProductsPage";
import {ProductPage} from "../../../pages/products/ProductPage";

test.describe('User can open social links', async () => {
    test('User can open twitter link', async ({page}) => {
        await loginTestHelper(page, 'standard_user');

        const productsPage = new ProductsPage(page);


    });
});