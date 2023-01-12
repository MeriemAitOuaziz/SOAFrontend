import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { fetchRemboursements } from "../Api/Remboursement";
import * as React from "react";
import { useEffect } from "react";
import { validateRemboursement } from "../Api/Remboursement";
import { validateRemboursementPrice } from "../Api/Remboursement";
import OrderModalDialog from "./ChangeOrdreRem";
import PriceModalDialog from "./PriceValidationModal";

const rows = [
  {
    id: 1,
    demandeur: "Ahmed",
    ordre: 1,
    budgetAttrib: 900,
    remboursementAttrib: 800,
    isValid: true,
    validPrice: false,
  },
  {
    id: 2,
    demandeur: "Ahmed",
    validPrice: 500,
    ordre: 1,
    budgetAttrib: 900,
    remboursementAttrib: 800,
    isValid: false,
    validPrice: false,
  },
];

export default function RemboursementTable(props) {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  //  const [remboursements, setRemboursements] = React.useState([]);
  //  const [remboursementsPerUser , setRemboursementsPerUser]=React.useState([]);
  //  useEffect(() => {
  //    all ?
  //      fetchRemboursements(setRemboursements)
  //      : ;
  //  }, []);
  const { remboursements } = props;

  const columns = [
    { field: "id", headerName: "Remboursement ID",flex: 1},
    { field: "demandeur", headerName: "Demandeur", flex: 1, },
    {
      field: "ordre",
      headerName: "Ordre",
      flex: 1,
      renderCell: ({ row: { ordre, id } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            justifyItems="center"
            borderRadius="4px"
            flexDirection="row"
          >
            <Typography m="20px">{ordre}</Typography>
            <Button
              variant="outlined"
              size="small"
              fullWidth
              onClick={() => {
                setOpen(true);
              }}
            >
              Modifier
            </Button>
            <OrderModalDialog open={open} handleClose={handleClose} id={id} />
          </Box>
        );
      },
    },
    { field: "budgetAttrib", headerName: "Budget Attribué", flex: 1, },
    {
      field: "remboursementAttrib",
      headerName: "Remboursement Attribué",
      flex: 1,
    },
    {
      field: "isValid",
      headerName: "Validation",
      flex: 1,
      renderCell: ({ row: { isValid, id } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >
            {isValid == 1 ? (
              <Button variant="contained" color="success" disabled fullWidth>
                Validé
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ backgroundColor: "#70d8bd" }}
                onClick={() => validateRemboursement(id)}
                fullWidth
              >
                Valider
              </Button>
            )}
          </Box>
        );
      },
    },
    {
      field: "validPrice",
      headerName: "Validation du prix",
      flex: 1,
      renderCell: ({ row: { validPrice, isValid, id, demandeur } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
          >
            {validPrice == 1 ? (
              <Button variant="contained" color="success" disabled fullWidth>
                Validé
              </Button>
            ) : isValid == 1 ? (
              <>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#70d8bd" }}
                  onClick={() => {
                    setOpen2(true);
                  }}
                  fullWidth
                >
                  Valider
                </Button>
                <PriceModalDialog
                  open2={open2}
                  handleClose2={handleClose2}
                  id={id}
                  demandeur={demandeur}
                />
              </>
            ) : (
              <Typography>Request not Approved yet</Typography>
            )}
          </Box>
        );
      },
    },
  ];

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={remboursements} columns={columns} />
    </div>
  );
}
