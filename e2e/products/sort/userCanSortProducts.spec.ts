import {expect, test} from "@playwright/test";
import {loginTestHelper} from "../../../helpers/common";
import {
    ProductsPage,
    productsSortedBy_A_TO_Z,
    productsSortedBy_Z_TO_A,
    SortOptions
} from "../../../pages/products/ProductsPage";

test.describe('User can sort products', async () => {
    test('User can sort product A_TO_Z', async ({page}) => {
        await loginTestHelper(page, 'standard_user');
        const productsPage = new ProductsPage(page);

        await productsPage.selectSortOption(SortOptions.A_TO_Z);
        await expect(await productsPage.getProductsTitle(), 'Product title is not correct').toEqual(productsSortedBy_A_TO_Z);

    });
    test('User can sort product Z_TO_A', async ({page}) => {
        await loginTestHelper(page, 'standard_user');
        const productsPage = new ProductsPage(page);

        await productsPage.selectSortOption(SortOptions.Z_TO_A);
        await expect(await productsPage.getProductsTitle(), 'Product title is not correct').toEqual(productsSortedBy_Z_TO_A);

    });

});