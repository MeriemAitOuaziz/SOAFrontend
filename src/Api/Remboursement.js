import configData from "../config.json";
import axios from "axios";

const Remboursement_Api_Url_S1 = configData.SERVICE1_URL + "remboursements";
const Remboursement_Api_Url_S2 = configData.SERVICE2_URL + "remboursements";
const Remboursement_Api_Url_S3 = configData.SERVICE3_URL + "remboursements";
const Remboursement_Api_Url_S4 = configData.SERVICE4_URL + "remboursements";

//fetches all Remboursements
const fetchRemboursements = (setRemboursements) => {
  axios.get(`${Remboursement_Api_Url_S1}`).then(
    (res) => {
      console.log(res.data);
      setRemboursements(res.data);
    },
    (err) => {
      console.error("error in getting Remboursements");
    }
  );
};

//fetches Remboursements by demandeur
const fetchRemboursementsByDemandeur = (
  setRemboursementsByDemandeur,
  demandeur
) => {
  axios.get(`${Remboursement_Api_Url_S1}` + "/" + `${demandeur}`).then(
    (res) => {
      console.log(res.data);
      setRemboursementsByDemandeur(res.data);
    },
    (err) => {
      console.error("error in getting Remboursements by demandeur");
    }
  );
};

//compute remboursement
const computeRemboursement = (id) => {
  axios.put(`${Remboursement_Api_Url_S4}` + "/compute/" + `${id}`).then(
    (res) => {
      console.log(res.data);
    },
    (err) => {
      console.error("error in compute remboursement");
    }
  );
};

//creates a Remboursement demande
const createRemboursement = (demandeur, frais, budgetAttrib) => {
  axios
    .put(
      `${Remboursement_Api_Url_S2}` +
        "/" +
        `${demandeur}` +
        "/" +
        `${frais}` +
        "/" +
        `${budgetAttrib}`
    )
    .then(
      (res) => {
        console.log(res.data);
      },
      (err) => {
        console.error("error in creating a Remboursement demande");
      }
    );
};

//Changes Remboursement isValid to true
const validateRemboursement = (id) => {
  axios.put(`${Remboursement_Api_Url_S3}` + "/" + `${id}`).then(
    (res) => {
      console.log(res.data);
    },
    (err) => {
      console.error("error in validating Remboursement");
    }
  );
};

//Changes Remboursement isValid to true
const validateRemboursementPrice = (id) => {
  axios.put(`${Remboursement_Api_Url_S3}` + "/frais/" + `${id}`).then(
    (res) => {
      console.log(res.data);
    },
    (err) => {
      console.error("error in validating Remboursement price");
    }
  );
};

//changes ordre of Remboursement
const changeOrdre = (id, ordre) => {
  axios
    .put(`${Remboursement_Api_Url_S3}` + "/" + `${id}` + "/" + `${ordre}`)
    .then(
      (res) => {
        console.log(res.data);
      },
      (err) => {
        console.error("error in changing ordre of Remboursement");
      }
    );
};

export {
  fetchRemboursements,
  fetchRemboursementsByDemandeur,
  createRemboursement,
  validateRemboursement,
  changeOrdre,
  validateRemboursementPrice,
  computeRemboursement,
};
