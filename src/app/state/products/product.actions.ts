// Path: src/app/state/products/product.actions.ts

import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../../core/models/product.model';

export const ProductActions = createActionGroup({
  source: 'Products',
  events: {
    'Load Products': emptyProps(),
    'Load Products Success': props<{ products: Product[] }>(),
    'Load Products Failure': props<{ error: string }>(),
  }
});
