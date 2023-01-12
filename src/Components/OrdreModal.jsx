import {
    Dialog, Grid, TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import { withStyles } from "@mui/styles";
import { useEffect, useState } from "react";


import { changeOrdre, createMission } from "../Api/Mission";


// const styles = {
//   dialogPaper: {
//     minHeight: "45vh",
//     maxHeight: "45vh",
//   },
// };

function BasicModal({ handleClose, open }) {

  const [formValues, setFormValues] = useState({ ordre:""});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((current) => {
      return {
        ...current,
        // 👇️ override value for nested country property
        [name]: value,
      };
    });
  };
  const handleSubmit = () => {
    //api call
    changeOrdre(formValues.ordre);
  };

  return (
    <div>
      <Dialog
        fullWidth="true"
        maxWidth="md"
        maxHeight="md"
        open={open}
        onClose={handleClose}
        scroll="body"
      
      
      >
        <form onSubmit={() => handleSubmit()}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <Box
                sx={{ color: "#5778FF" }}
                className="fw-bold text-center mt-2"
              >
                Changer l'ordre
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-basic"
                label="ordre"
                variant="outlined"
                fullWidth
                name="ordre"
                value={formValues.ordre}
                onChange={handleChange}
              />
             
            </Grid>

            <Grid item xs={12}>
              <Button variant="outlined" color="success" type="submit">
                Ajouter
              </Button>
            </Grid>
          </Grid>
        </form>
      </Dialog>
    </div>
  );
}

// export default withStyles(styles)(BasicModal);

export default BasicModal;