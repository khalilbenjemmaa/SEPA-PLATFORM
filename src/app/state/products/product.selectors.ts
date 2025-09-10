// Path: src/app/state/products/product.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  (state) => state.products
);

export const selectProductsLoading = createSelector(
  selectProductState,
  (state) => state.loading
);

export const selectProductById = (productId: string) => createSelector(
  selectAllProducts,
  (products) => products.find(p => p.id === productId)
);
