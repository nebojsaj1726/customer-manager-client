import { Box } from '@mui/material';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Actions from '../../components/Actions';
import SearchBar from '../../components/SearchBar';
import { Customer, getCustomers } from './customersSlice';

const Customers = () => {
  const dispatch = useAppDispatch();
  const { customers, loading, total } = useAppSelector(
    (state) => state.customers,
  );
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    dispatch(getCustomers({ page, limit }));
  }, [dispatch, limit, page]);

  const columns = [
    { field: 'firstName', headerName: 'First name' },
    { field: 'lastName', headerName: 'Last name' },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'address', headerName: 'Address', width: 150 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'company', headerName: 'Company' },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      renderCell: (params: GridRenderCellParams) => <Actions id={params.id} />,
    },
  ];

  const rows = customers.map((customer: Customer) => {
    const { _id, ...rest } = customer;
    return { ...rest, id: _id };
  });

  return (
    <Box mt={3}>
      <SearchBar />
      <Box height={500} mt={3}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          autoHeight
          pagination
          paginationMode="server"
          page={page - 1}
          pageSize={limit}
          onPageChange={(newPage) => {
            setPage(newPage + 1);
          }}
          onPageSizeChange={(newPageSize) => {
            setLimit(newPageSize);
          }}
          rowsPerPageOptions={[5, 10, 20]}
          rowCount={total}
        />
      </Box>
    </Box>
  );
};

export default Customers;
