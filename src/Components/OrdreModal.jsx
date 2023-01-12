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

function BasicModal({ handleClose, open,id }) {

  const [formValues, setFormValues] = useState({ ordre:""});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(() => {
      return {
        [name]: value,
      };
    });
    console.log(formValues);
  };
  const handleSubmit = () => {
    //api call
    changeOrdre(id,formValues.ordre);
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
                Modifier
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