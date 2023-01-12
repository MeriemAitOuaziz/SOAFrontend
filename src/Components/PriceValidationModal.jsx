import * as React from 'react';
import Button from '@mui/joy/Button';
import TextField from '@mui/joy/TextField';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import Typography from '@mui/joy/Typography';
import { changeOrdre, createRemboursement } from '../Api/Remboursement';
import { computeRemboursement } from '../Api/Remboursement';
import { fetchRemboursementsByDemandeur } from '../Api/Remboursement';
import { validateRemboursementPrice } from '../Api/Remboursement';

import { useState, useEffect, } from "react";

export default function PriceModalDialog(props) {

  const [demandesPerUser, setDemandesPerUser] = useState([]);
  const [actualDemande, setActualDemande]=useState({})

   const onSubmit = (e) => {
    e.preventDefault();
   // changeOrdre(id, order);
   validateRemboursementPrice(id);
    handleClose2();
  
    }
  


  const {open2, handleClose2, id, demandeur} = props;
  useEffect(() => {
    computeRemboursement(id);
    fetchRemboursementsByDemandeur(setDemandesPerUser,demandeur);
    demandesPerUser.filter(demande=>demande.id===id).forEach(demande=>setActualDemande(demande));

    if (!open2) {
    }
  }, []);
  return (
   
      <Modal open={open2} >
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
            Validation and price verification
          </Typography>
          <Typography
            id="basic-modal-dialog-description"
            mt={0.5}
            mb={2}
            textColor="text.tertiary"
          >
            Please verify the information below :
          </Typography>
          
          <form
          
            onSubmit={onSubmit}
          >
            <Typography>Frais : {demandesPerUser.frais}</Typography>
            <Typography>Budget attribué : {actualDemande.budgetAttrib}</Typography>
            <Typography>Remboursement Calculé : {actualDemande.remboursementAttrib}</Typography>
            <Stack spacing={2}>
              
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
  );
}