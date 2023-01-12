import { Box, Grid, Tab } from "@mui/material";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { useState, useEffect, useRef, TextField , Stack} from "react";


export default function AddRemboursementModal(props) {

  const { onClose, open, ...other } = props;

  useEffect(() => {
    if (!open) {
    }
  }, [open]);

  const handleEntering = () => {};

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {};

  const handleChange = (event) => {};

  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          width: "90%",
          maxHeight: 500,
          //backgroundColor: colors.blueAccent[800],
        },
      }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>Ajouter une demande de Remboursement</DialogTitle>
      <DialogContent dividers>
      <form
            onSubmit={(event) => {
            }}
          >
            <Stack spacing={2}>
              <TextField label="Name" autoFocus required />
              <TextField label="Description" required />
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
       
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleCancel}
         // sx={{ color: colors.grey[100] }}
        >
          Cancel
        </Button>
        <Button onClick={handleOk} sx={{ }}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
