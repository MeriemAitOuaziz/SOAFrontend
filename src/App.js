import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MissionTable from './Components/MissionTable';
import RemboursementTable from "./Components/RemboursementTable";
import { Button, TextField, IconButton } from "@mui/material";
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
  const [open, setOpen] = React.useState(false);
  const [demandeur, setDemandeur] = useState("");
  const [missions, setMissions] = useState([]);
  const [missionsByDemandeur, setMissionsByDemandeur] = useState([]);
  const [showModal, setshowModal] = useState(false);
  useEffect(() => {
    fetchMissions(setMissions);
  }, [missions]);
 const handleClose =()=>{
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
                <MenuItem value={mission.id} key={mission.id}>
                  {mission.demandeur}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="outlined" type="submit" >Rechercher</Button>
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
          <TextField
            margin="10px"
            id="outlined-basic"
            label="Chercher Remboursements par demandeur"
            variant="outlined"
            size="small"
            style = {{width: 500}}
          />
          <IconButton aria-label="delete" size="small">
            <SearchIcon fontSize="inherit" />
          </IconButton>

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

        <RemboursementTable />
      </TabPanel>

      <NewMissionModel open={showModal} handleClose={handleClose}/>
    </Box>
  );
}

