import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function ConfirmDialog({ handleClose, dialogTitle, dialogText, textButtonCancel, textButtonAgree, handleAgree }) {
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={'sm'}>
      <DialogTitle>
        {dialogTitle}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>{dialogText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{textButtonCancel}</Button>
        <Button
          onClick={handleAgree}
          autoFocus>
          {textButtonAgree}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
