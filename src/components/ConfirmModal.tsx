import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

type ConfirmModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
};

const ConfirmModal = ({ open, setOpen, onConfirm }: ConfirmModalProps) => (
  <Dialog open={open} onClose={() => setOpen(false)}>
    <DialogContent sx={{ padding: 4 }}>
      <Typography variant="subtitle1">
        Are you sure you want to delete this customer?
      </Typography>
    </DialogContent>
    <DialogActions sx={{ justifyContent: 'center', marginBottom: 2 }}>
      <Button
        variant="contained"
        onClick={() => {
          onConfirm();
          setOpen(false);
        }}
      >
        Yes
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmModal;
