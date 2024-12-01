import axios, { AxiosResponse } from "axios";

const BASE_URL = "http://us-central1-test-b7665.cloudfunctions.net/api/";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

type ProductToAdd = {
  title?: string;
  category?: string;
  price?: number;
  employee?: string;
  description?: string;
  reviews?: string[];
};

const handleApiError = (error: unknown): never => {
  console.error("API Error:", error);
  throw error;
};

export const getStores = async (): Promise<any> => {
  try {
    const response: AxiosResponse = await api.get("stores");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createProduct = async (idStore: string, product: ProductToAdd) => {
  try {
    const response: AxiosResponse = await api.post(
      `stores/${idStore}/products`,
      product
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteProductApi = async (
  idStore: string,
  idProduct: string
): Promise<void> => {
  try {
    await api.delete(`stores/${idStore}/products/${idProduct}`);
  } catch (error) {
    throw error;
  }
};

export const getPaginatedProducts = async (
  idStore: string,
  page: number,
  elements: number
) => {
  try {
    const response: AxiosResponse = await api.get(
      `stores/${idStore}/products`,
      {
        params: { page, elements },
      }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getStoreDetails = async (idStore: string) => {
  try {
    const response: AxiosResponse = await api.get(`stores/${idStore}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getCategoryStats = async (idStore: string): Promise<
  { numberOfProducts: number; category: string }[]
> => {
  try {
    const response: AxiosResponse = await api.get(
      `stores/${idStore}/stats/categories`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};