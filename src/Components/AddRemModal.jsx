import * as React from 'react';
import Button from '@mui/joy/Button';
import TextField from '@mui/joy/TextField';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';

import { useState, useEffect, } from "react";

export default function BasicModalDialog(props) {
 // const [open, setOpen] = React.useState(false);
  const {open} = props;
  useEffect(() => {
    if (!open) {
    }
  }, [open]);
  return (
   
      <Modal open={open} >
        <ModalDialog
          aria-labelledby="basic-modal-dialog-title"
          aria-describedby="basic-modal-dialog-description"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <Typography
            id="basic-modal-dialog-title"
            component="h2"
            level="inherit"
            fontSize="1.25em"
            mb="0.25em"
          >
            Create new project
          </Typography>
          <Typography
            id="basic-modal-dialog-description"
            mt={0.5}
            mb={2}
            textColor="text.tertiary"
          >
            Fill in the information of the project.
          </Typography>
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
        </ModalDialog>
      </Modal>
  );
}