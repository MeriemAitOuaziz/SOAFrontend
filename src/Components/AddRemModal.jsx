import * as React from 'react';
import Button from '@mui/joy/Button';
import TextField from '@mui/joy/TextField';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';
import { createRemboursement } from '../Api/Remboursement';

import { useState, useEffect, } from "react";

export default function BasicModalDialog(props) {
 // const [open, setOpen] = React.useState(false);
 const [formData, setFormData] = React.useState({
    demandeur : '',
    frais: 0,
    budgetAtt: 0 
 })
 const {demandeur, frais, budgetAtt} = formData;
 const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
   }

   const onSubmit = (e) => {
    e.preventDefault()
    createRemboursement(demandeur,frais,budgetAtt);
    onClose();
  
    }
  


  const {open, onClose} = props;
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
            Remboursements
          </Typography>
          <Typography
            id="basic-modal-dialog-description"
            mt={0.5}
            mb={2}
            textColor="text.tertiary"
          >
            Ajouter une demande de remboursement
          </Typography>
          <form
            onSubmit={onSubmit}
          >
            <Stack spacing={2}>
              <TextField label="Demandeur" type="text" name="demandeur" value={demandeur} placeholder="Demandeur" onChange={onChange} autoFocus required />
              <TextField label="Frais" type="text" value={frais} name="frais" placeholder="Frais" onChange={onChange} required />
              <TextField label="Budget Attribué" type="text" value={budgetAtt} name="budgetAtt" placeholder="Budget Attribué" onChange={onChange} required />
              <Button onClick={onSubmit}>Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
  );
}