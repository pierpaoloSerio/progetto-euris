import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProduct,
  getCategoryStats,
  getPaginatedProducts,
  getStores,
} from "../services/api";
import { deleteProductApi } from "../services/api";

type Stores = {
  id: string;
  data: {
    title: string;
    description: string;
    price: number;
    category: string;
    employee: string[];
    reviews: string[];
  };
};

type Products = {
  id: string;
  data: {
    title: string;
    description: string;
    price: number;
    category: string;
    employee: string;
    reviews: string[];
  };
};

type ProductToAdd = {
  title?: string;
  category?: string;
  price?: number;
  employee?: string;
  description?: string;
  reviews?: string[];
};

type Categories = {
  numberOfProducts: number;
  category: string;
};

type ProductsState = {
  stores: Stores[];
  products: Products[];
  totalPages: number;
  currentPage: number;
  categories: Categories[];
  loading: boolean;
  error: string | null;
};

const initialState: ProductsState = {
  stores: [],
  products: [],
  totalPages: 0,
  currentPage: 1,
  categories: [],
  loading: false,
  error: null,
};

export const fetchStoreList = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const data = await getStores();
    return data;
  }
);

export const fetchPaginatedProducts = createAsyncThunk(
  "products/fetchPaginatedProducts",
  async ({
    idStore,
    page,
    limit,
  }: {
    idStore: string;
    page: number;
    limit: number;
  }) => {
    const response = await getPaginatedProducts(idStore, page, limit);

    const products = response.list || [];
    const totalPages = Math.ceil(response.length / limit);

    return { products, totalPages, currentPage: page };
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ idStore, product }: { idStore: string; product: ProductToAdd }) => {
    const response = await createProduct(idStore, product);
    return response.json();
  }
);

export const deleteProduct = createAsyncThunk<
  string,
  { idStore: string; idProduct: string },
  { rejectValue: string }
>(
  "products/deleteProduct",
  async ({ idStore, idProduct }, { rejectWithValue }) => {
    try {
      await deleteProductApi(idStore, idProduct);
      return idProduct;
    } catch (error) {
      console.error("Error in deleteProduct thunk:", error);
      return rejectWithValue("Failed to delete product");
    }
  }
);

export const fetchCategoryStats = createAsyncThunk<
  { numberOfProducts: number; category: string }[],
  string,
  { rejectValue: string }
>("categories/fetchCategoryStats", async (idStore, { rejectWithValue }) => {
  try {
    const data = await getCategoryStats(idStore);
    return data;
  } catch (error) {
    console.error("Error in fetchCategoryStats:", error);
    return rejectWithValue("Failed to fetch category stats");
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStoreList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchStoreList.fulfilled, (state, action) => {
      state.loading = false;
      state.stores = action.payload;
    });
    builder.addCase(fetchStoreList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Error fetching products";
    });

    builder.addCase(fetchPaginatedProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPaginatedProducts.fulfilled, (state, action) => {
      state.products = action.payload.products || [];
      state.totalPages = action.payload.totalPages || 1;
      state.currentPage = action.payload.currentPage || 1;
    });

    builder.addCase(fetchPaginatedProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch products";
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    });
    builder.addCase(fetchCategoryStats.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategoryStats.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategoryStats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setPage } = productsSlice.actions;
export default productsSlice.reducer;
