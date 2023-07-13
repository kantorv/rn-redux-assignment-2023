import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {fetchProducts} from './productsAPI';

export interface ProductsState {
  status: 'idle' | 'loading' | 'failed';
  items: ProductItem[];
  filter: ProductsFilter;
  filteredItems: ProductItem[];
}

const initialState: ProductsState = {
  status: 'idle',
  items: [],
  filter: {},
  filteredItems: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const loadProductsAsync = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetchProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  },
);

// function filterUniqueObjects(value, index, array) {
//   return array.indexOf(value) === index;
// }

const filterItems = (
  items: ProductItem[],
  brand?: number,
  quality?: number,
  size?: number,
) => {
  let filteredItems = items.slice(); //clone

  console.log('[filterItems] called', {brand, quality, size});

  if (undefined !== brand) {
    filteredItems = filteredItems.filter(x => x.brandId === brand);
  }

  if (undefined !== quality) {
    filteredItems = filteredItems.filter(x => x.qualityId === quality);
  }

  if (undefined !== size) {
    filteredItems = filteredItems.filter(x => x.sizeId === size);
  }

  return filteredItems;
};

export const getUniqueAttributesList = (items: ProductItem[]) => {
  /**
   * q3
   * sd
   */
  // https://stackoverflow.com/a/67322087/592737
  //arr.filter((a, i) => arr.findIndex((s) => a.age === s.age) === i) // [{"name":"Joe", "age":17}, {"name":"Carl", "age": 35}]
  const brands = items
    .filter(
      (a, i) =>
        items.findIndex(s => a.brandId && a.brandId === s.brandId) === i,
    )
    .map(x => ({id: x.brandId, name: x.brandName})) as ProductBrand[];

  const qualities = items
    .filter(
      (a, i) =>
        items.findIndex(s => a.qualityId && a.qualityId === s.qualityId) === i,
    )
    .map(x => ({id: x.qualityId, name: x.qualityName})) as ProductQuality[];

  const sizes = items
    .filter(
      (a, i) => items.findIndex(s => a.sizeId && a.sizeId === s.sizeId) === i,
    )
    .map(x => ({id: x.sizeId, name: x.sizeName})) as ProductSize[];

  return {brands, qualities, sizes};
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    filterBy: (state, action: PayloadAction<FilterPayloadParams>) => {
      console.log('[reducers.filterBy]', action.payload, state.filter);
      const {id, name} = action.payload;
      if (state.filter[name as keyof ProductsFilter] !== undefined) {
        state.filter = {...state.filter, [name]: undefined};
      } else {
        state.filter = {...state.filter, [name]: id};
      }

      const filteredItems = filterItems(
        state.items,
        state.filter.brand,
        state.filter.quality,
        state.filter.size,
      );
      state.filteredItems = filteredItems;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadProductsAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(loadProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(loadProductsAsync.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const {filterBy} = productsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectItems = (state: RootState) => state.products.items;
export const selectFilter = (state: RootState) => state.products.filter;
export const selectFilteredItems = (state: RootState) =>
  state.products.filteredItems;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default productsSlice.reducer;
