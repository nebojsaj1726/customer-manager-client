import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { GridRowId } from '@mui/x-data-grid';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { deleteCustomer } from '../features/customers/customersSlice';
import ConfirmModal from './ConfirmModal';

const Actions = ({ id }: { id: GridRowId }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <Box>
      <IconButton component={NavLink} to={`/edit-customer/${id}`}>
        <EditOutlined />
      </IconButton>
      <IconButton onClick={() => setOpen(true)}>
        <DeleteOutlined />
      </IconButton>
      <ConfirmModal
        open={open}
        setOpen={setOpen}
        onConfirm={() => {
          dispatch(deleteCustomer(id.toString()));
        }}
      />
    </Box>
  );
};

export default Actions;
