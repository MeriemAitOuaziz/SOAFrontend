import * as React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MissionTable from './Components/MissionTable';
import RemboursementTable from "./Components/RemboursementTable";
import {  TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddRemboursementModal from "./Components/AddRemboursementModal";
import BasicModalDialog from "./Components/AddRemModal";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { fetchMissions, fetchMissionsByDemandeur } from "./Api/Mission";
import { Stack } from "@mui/system";      
import NewMissionModel from "./Components/NewMissionModel";
import { fetchRemboursements, fetchRemboursementsByDemandeur } from './Api/Remboursement';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function App() {
  const [value, setValue] = React.useState(0);
  const [remboursements, setRemboursements] = useState([]);
  const [remboursementsByDemandeur, setRemboursementsByDemandeurs] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [demandeur, setDemandeur] = useState("");
  const [missions, setMissions] = useState([]);
  const [requester, setRequester] = useState("");
  const [missionsByDemandeur, setMissionsByDemandeur] = useState([]);
  const [all, setAll]=useState(true);
  const [showModal, setshowModal] = useState(false);
  useEffect(() => {
    fetchMissions(setMissions);
    fetchRemboursements(setRemboursements) 
  }, []);
 const handleCloseMissionModal =()=>{
  setshowModal(false);
 }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeDemandeur = (e) => {
    setDemandeur(e.target.value);
  };
  const handleSubmit=()=>{
    fetchMissionsByDemandeur(setMissions, demandeur);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setRequester(e.target.value);
  };
  const onSubmit= () => {
    fetchRemboursementsByDemandeur(setRemboursements,requester);
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Missions" {...a11yProps(0)} />
          <Tab label="Remboursements" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Typography mb={2} variant="h3" component="h2" align="center">
          Missions
        </Typography>
        <Stack direction="row" spacing={2}>
          <form onSubmit={handleSubmit} style={{width:"100%"}}>
          <Stack direction="row" spacing={2}>
          <FormControl fullWidth>
            <InputLabel id="demandeur">Demandeur</InputLabel>
            <Select
              labelId="demandeur"
              id="demandeur-select"
              value={demandeur}
              label="Demandeur"
              defaultValue=""
              name="demandeur"
              onChange={handleChangeDemandeur}
            >
              {missions.map((mission) => (
                <MenuItem value={mission.demandeur} key={mission.id}>
                  {mission.demandeur}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={handleSubmit} >Rechercher</Button>
          </Stack>
          </form>
          <Button variant="outlined" onClick={()=>{
            setshowModal(true);
          }}>Demande de mission</Button>
        </Stack>
        <MissionTable missions={missions} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Typography variant="h4" fontWeight="bold" sx={{ mb: "5px" }}>
            Remboursements
          </Typography>
          <form
            
          >
            <Stack spacing={2}>
             
          <TextField
            margin="10px"
            id="outlined-basic"
            label="Chercher Remboursements par demandeur"
            variant="outlined"
            size="small"
            style = {{width: 500}}
            value={requester}
            name="requester"
            onChange={onChange}
          />
          <IconButton aria-label="delete" size="small" onClick={()=>{fetchRemboursementsByDemandeur(setRemboursements,requester)}} >
            <SearchIcon fontSize="inherit" />
          </IconButton>
          </Stack>
          </form>

          <Button
            variant="contained"
            sx={{ m: "10px", backgroundColor: "#70d8bd" }}
            onClick={() => {
              setOpen(true);
            }}
          >
            <Typography variant="h7">Ajouter Remboursement</Typography>
          </Button>
         {/*} <AddRemboursementModal
              id="ringtone-menu"
              keepMounted
              open={open}
              onClose={handleClose}
              value="Dione"
          />*/}
          <BasicModalDialog
          open={open}
          onClose={handleClose}
          />
          
        </Box>

        <RemboursementTable remboursements={remboursements}/>
      </TabPanel>

      <NewMissionModel open={showModal} handleClose={handleCloseMissionModal}/>
    </Box>
  );
}

