import axios from "axios";

async function CarParkChargeAPI() {
  const config = {
    headers:{
      'Content-Type': 'application/json'
    }
  }
  let result = await axios.get(
    "https://api.data.gov.hk/v2/filter?q=%7B%22resource%22%3A%22https%3A%2F%2Fwww.hkelectric.com%2Fen%2FElectricLiving%2FElectricVehicles%2FDocuments%2FLocations%2520of%2520HK%2520Electric%2520EV%2520charging%2520stations_chi.csv%22%2C%22section%22%3A1%2C%22format%22%3A%22json%22%7D",config
  );
  // console.table(result.data);
  return result.data;
}
export default CarParkChargeAPI;
