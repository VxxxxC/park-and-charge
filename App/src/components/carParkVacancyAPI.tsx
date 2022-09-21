import axios from "axios";
import { HStack, VStack, Text } from "native-base";
import Papa from "papaparse";
import React, { useEffect, useMemo, useState } from "react";

function CarParkVacancyAPI({ Id }: any) {
  let carparkID = Id;
  //   console.log(carparkID);
  const [updateTime, setUpdateTime] = useState("");
  const [vacancy, setVacancy] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;

    axios(
      `https://api.data.gov.hk/v1/carpark-info-vacancy?data=vacancy&carparkIds=${carparkID}&lang=zh_TW`
    ).then((result) => {
      if (mounted) {
        const info = result.data.results[0];
        const privateCarInfo = info.privateCar;
        const privateCarVacancy = privateCarInfo[0];
        //vacancyInfo = `更新時間 :  ${privateCarVacancy.lastupdate}
        // 剩餘車位 :  ${privateCarVacancy.vacancy}
        //`;

        // if (privateCarVacancy.vacancy == -1 || null) {
        //   return;
        // }
        setVacancy(privateCarVacancy.vacancy);
        setUpdateTime(privateCarVacancy.lastupdate);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [Id]);

  return (
    <>
      {loading ? (
        <Text color="dark.900" fontSize="15px">
          Loading...
        </Text>
      ) : (
        <Text>
          {vacancy > 0 && (
            <>
              <HStack alignItems="center">
                <Text color="dark.900" fontWeight="bold" fontSize="lg">
                  剩餘車位 :
                </Text>
                {vacancy < 30 ? (
                  <Text color="red.600" fontSize="5xl" fontWeight="bold">
                    {vacancy}
                  </Text>
                ) : (
                  <Text color="green.600" fontSize="5xl" fontWeight="bold">
                    {vacancy}
                  </Text>
                )}
              </HStack>

              <HStack alignItems="center">
                <Text color="dark.900" fontSize="15px">
                  最後更新時間 :
                </Text>
                <Text color="dark.900">{updateTime}</Text>
              </HStack>
            </>
          )}
        </Text>
      )}
    </>
  );
}

export default CarParkVacancyAPI;
