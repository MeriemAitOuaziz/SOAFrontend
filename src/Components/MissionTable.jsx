import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import OrdreModal from "./OrdreModal";
import { validateMission } from "../Api/Mission";

function createData(id, demandeur, contenu, ordre, isValid) {
  return { id, demandeur, contenu, ordre, isValid };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, true),
  createData("Ice cream sandwich", 237, 9.0, 37, false),
  createData("Eclair", 262, 16.0, 24, true),
  createData("Cupcake", 305, 3.7, 67, true),
  createData("Gingerbread", 356, 16.0, 49, false),
];

export default function MissionTable({ missions }) {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id Mission </TableCell>
            <TableCell align="center">Demandeur</TableCell>
            <TableCell align="center">Contenu</TableCell>
            <TableCell align="center">Ordre</TableCell>
            <TableCell align="center">Statut</TableCell>
            <TableCell align="center">Validation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {missions.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="center">{row.demandeur}</TableCell>
              <TableCell align="center">{row.contenu}</TableCell>
              <TableCell align="center">
                <Stack>
                  <div>{row.ordre}</div>
                  <Button
                    style={{ margin: "15px" }}
                    variant="outlined"
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    Modifer
                  </Button>
                  <OrdreModal open={showModal} handleClose={handleClose} id={row.id}/>
                </Stack>
              </TableCell>
              <TableCell align="center">
                {row.isValid ? "Validé" : "Non validé"}
              </TableCell>
              <TableCell align="center">
                {!row.isValid && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      validateMission(row.id);
                    }}
                  >
                    Valider
                  </Button>
                )}
                {row.isValid && (
                  <Button disabled variant="contained">
                    Valider
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
 
    </TableContainer>
  );
}
