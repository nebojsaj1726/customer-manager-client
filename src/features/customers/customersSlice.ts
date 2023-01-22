import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { api } from '../../api/api';

export type Customer = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  description?: string;
  company: string;
};

type CustomersState = {
  customer: Customer | null;
  customers: Customer[];
  total: number;
  loading: boolean;
  error: AxiosError | unknown;
};

export const getCustomers = createAsyncThunk(
  'customer/getCustomers',
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await api.get(`/customers?page=${page}&limit=${limit}`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response && axiosError.response.data.message) {
        return rejectWithValue(axiosError.response.data.message);
      } else {
        return rejectWithValue(axiosError.message);
      }
    }
  },
);

export const getCustomerDetails = createAsyncThunk(
  'customer/getCustomerDetails',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/customers/${id}`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response && axiosError.response.data.message) {
        return rejectWithValue(axiosError.response.data.message);
      } else {
        return rejectWithValue(axiosError.message);
      }
    }
  },
);

export const searchByCompany = createAsyncThunk(
  'customer/searchByCompany',
  async ({ company }: { company: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/customers/search?company=${company}`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response && axiosError.response.data.message) {
        return rejectWithValue(axiosError.response.data.message);
      } else {
        return rejectWithValue(axiosError.message);
      }
    }
  },
);

export const createCustomer = createAsyncThunk(
  'customer/createCustomer',
  async (
    { customer, navigate }: { customer: Customer; navigate: NavigateFunction },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await api.post('/customers', customer);
      navigate('/customers');
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response && axiosError.response.data.message) {
        return rejectWithValue(axiosError.response.data.message);
      } else {
        return rejectWithValue(axiosError.message);
      }
    }
  },
);

export const editCustomer = createAsyncThunk(
  'customer/editCustomer',
  async (
    {
      customer,
      id,
      navigate,
    }: { customer: Customer; id: string; navigate: NavigateFunction },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await api.patch(`/customers/${id}`, customer);
      navigate('/customers');
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response && axiosError.response.data.message) {
        return rejectWithValue(axiosError.response.data.message);
      } else {
        return rejectWithValue(axiosError.message);
      }
    }
  },
);

export const deleteCustomer = createAsyncThunk(
  'customer/deleteCustomer',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`customers/${id}`);
      return id;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      if (axiosError.response && axiosError.response.data.message) {
        return rejectWithValue(axiosError.response.data.message);
      } else {
        return rejectWithValue(axiosError.message);
      }
    }
  },
);

const initialState: CustomersState = {
  customer: null,
  customers: [],
  total: 0,
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    clearApiError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCustomers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCustomers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.customers = payload.data;
      state.total = payload.total;
    });
    builder.addCase(getCustomers.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(getCustomerDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCustomerDetails.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.customer = payload;
    });
    builder.addCase(getCustomerDetails.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(searchByCompany.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchByCompany.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.customers = payload;
      state.total = payload.length;
    });
    builder.addCase(searchByCompany.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(createCustomer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCustomer.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.customers = [...state.customers, payload];
    });
    builder.addCase(createCustomer.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(editCustomer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editCustomer.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.customer =
        state.customer?._id === payload._id ? payload : state.customer;
      state.customers = state.customers.map((customer) =>
        customer._id === payload.id ? payload : customer,
      );
    });
    builder.addCase(editCustomer.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(deleteCustomer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCustomer.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.customers = state.customers.filter(
        (customer) => customer._id !== payload,
      );
    });
  },
});

export const { clearApiError } = customerSlice.actions;
export default customerSlice.reducer;
