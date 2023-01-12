import configData from "../config.json";
import axios from "axios";

const Mission_Api_Url_S1 = configData.SERVICE1_URL + "missions";
const Mission_Api_Url_S2 = configData.SERVICE2_URL + "missions";
const Mission_Api_Url_S3 = configData.SERVICE3_URL + "missions";

//fetches all missions
const fetchMissions = (setMissions) => {
  axios.get(`${Mission_Api_Url_S1}`).then(
    (res) => {
      console.log(res.data);
      setMissions(res.data);
    },
    (err) => {
      console.error("error in getting Missions");
    }
  );
};

//fetches missions by demandeur
const fetchMissionsByDemandeur = (setMissionsByDemandeur, demandeur) => {
  axios.get(`${Mission_Api_Url_S1}` + "/" + `${demandeur}`).then(
    (res) => {
      console.log(res.data);
      setMissionsByDemandeur(res.data);
    },
    (err) => {
      console.error("error in getting Missions by demandeur");
    }
  );
};

//creates a mission
const createMission = (demandeur, contenu) => {
  axios
    .put(`${Mission_Api_Url_S2}` + "/" + `${demandeur}` + "/" + `${contenu}`)
    .then(
      (res) => {
        console.log(res.data);
      },
      (err) => {
        console.error("error in creating mission");
      }
    );
};

//Changes mission isValid to true
const validateMission = (id) => {
  axios.put(`${Mission_Api_Url_S3}` + "/" + `${id}`).then(
    (res) => {
      console.log(res.data);
    },
    (err) => {
      console.error("error in validating mission");
    }
  );
};

//changes ordre of mission
const changeOrdre = (id, ordre) => {
  axios.get(`${Mission_Api_Url_S3}` + "/" + `${id}` + "/" + `${ordre}`).then(
    (res) => {
      console.log(res.data);
    },
    (err) => {
      console.error("error in changing ordre of mission");
    }
  );
};

export {
  fetchMissions,
  fetchMissionsByDemandeur,
  createMission,
  validateMission,
  changeOrdre,
};
