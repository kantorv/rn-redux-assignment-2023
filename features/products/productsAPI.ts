import {data} from './data';

// A mock function to mimic making an async request for data
export function fetchProducts() {
  return new Promise<{data: ProductItem[]}>(resolve =>
    setTimeout(() => resolve({data: data}), 1000),
  );
}
