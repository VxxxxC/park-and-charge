import axios from "axios";
import Papa from "papaparse";
import { Text } from "native-base";

async function CarParkInfoAPI() {
  let result: any = await axios(
    "https://api.data.gov.hk/v1/carpark-info-vacancy?data=info&lang=zh_TW"
  );
  let data = (result.data.results)
  return data
}

export default CarParkInfoAPI;
