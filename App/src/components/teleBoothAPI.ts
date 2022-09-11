import axios from "axios";
import Papa from "papaparse";

async function TeleBoothAPI() {
  let result = await axios.get(
    "https://api.data.gov.hk/v1/historical-archive/get-file?url=https%3A%2F%2Fwww.ofca.gov.hk%2Ffilemanager%2Fofca%2Fcommon%2Fdatagovhk%2FPayPhoneRegister.csv&amp;time=20220201-1322"
  );
  //console.log(result);

  let resultArr = Papa.parse(result.data, {
    header: true,
  });
  return resultArr.data;
}
export default TeleBoothAPI;
// getAPI();
