import axios from "axios";
import { VStack, Text } from "native-base";
import Papa from "papaparse";
import React, { useEffect, useMemo, useState } from "react";

function CarkParkVacancyAPI({ Id }: any) {
  let carparkID = Id;
  //   console.log(carparkID);
  const [updateTime, setUpdateTime] = useState("");
  const [vacancy, setVacancy] = useState("");

  useMemo(async () => {
    const result = await axios(
      `https://api.data.gov.hk/v1/carpark-info-vacancy?data=vacancy&carparkIds=${carparkID}&lang=zh_TW`
    );

    const info = result.data.results[0];
    const privateCarInfo = info.privateCar;
    const privateCarVacancy = privateCarInfo[0];
    //vacancyInfo = `更新時間 :  ${privateCarVacancy.lastupdate}
    // 剩餘車位 :  ${privateCarVacancy.vacancy}
    //`;

    if (privateCarVacancy.vacancy == -1 || null) {
      return;
    }
    setVacancy(privateCarVacancy.vacancy);
    setUpdateTime(privateCarVacancy.lastupdate);
  }, [Id]);

  return (
    <VStack>
      <Text color="dark.900" fontWeight="bold" fontSize="lg">
        剩餘車位 :
      </Text>
      {vacancy < "10" ? (
        <Text color="red.600" fontSize="9xl">
          {vacancy}
        </Text>
      ) : (
        <Text color="green.600" fontSize="9xl">
          {vacancy}
        </Text>
      )}

      <Text color="dark.900" fontSize="15px">
        最後更新時間 :
      </Text>
      <Text color="dark.900">{updateTime}</Text>
    </VStack>
  );
}

export default CarkParkVacancyAPI;
