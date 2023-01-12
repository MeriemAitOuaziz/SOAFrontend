import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { colors } from "debug/src/browser";

const rows = [
  {
    id: 1,
    ID: 1,
    demandeur: "Ahmed",
    validPrice: 500,
    ordre: 1,
    budgetAttrib: 900,
    remboursementAttrib: 800,
    isValid: true,
    validPrice: true
  },
  {
    id: 2,
    ID: 1,
    demandeur: "Ahmed",
    validPrice: 500,
    ordre: 1,
    budgetAttrib: 900,
    remboursementAttrib: 800,
    isValid: false,
    validPrice: true
  },
];

const columns = [
  { field: "ID", headerName: "Remboursement ID", width: 150 },
  { field: "demandeur", headerName: "Demandeur", width: 150 },
  { field: "ordre", headerName: "Ordre", width: 150 },
  { field: "budgetAttrib", headerName: "Budget Attribué", width: 200 },
  {
    field: "remboursementAttrib",
    headerName: "Remboursement Attribué",
    width: 200,
  },
  {
    field: "isValid",
    headerName: "Validation",
    renderCell: ({ row: { isValid } }) => {
      return (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          borderRadius="4px"
        >
          {isValid ? (
            <Button variant="contained" color="success" disabled fullWidth>
              Validé
            </Button>
          ) : (
            <Button variant="contained" color="success" fullWidth>
              "Valider"
            </Button>
          )}
        </Box>
      );
    },
  },
  {
    field: "validPrice",
    headerName: "Validation du prix",
    renderCell: ({ row: { validPrice } }) => {
      return (
        <Box
          width="60%"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          borderRadius="4px"
        >
          {validPrice ? (
            <Button variant="contained" color="success" disabled fullWidth>
              Validé
            </Button>
          ) : (
            <Button variant="contained" color="success" fullWidth>
              "Valider"
            </Button>
          )}
        </Box>
      );
    },
  },
];

export default function RemboursementTable() {
  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
