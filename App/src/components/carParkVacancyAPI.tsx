import axios from "axios";
import { HStack, VStack, Text } from "native-base";
import React, { useEffect, useState } from "react";

function CarParkVacancyAPI({ Id }: any) {
  let carparkID = Id;
  //   console.log(carparkID);
  const [updateTime, setUpdateTime] = useState("");
  const [vacancy, setVacancy] = useState<number>(0);

  useEffect(() => {
    let mounted = true;

    axios(
      `https://api.data.gov.hk/v1/carpark-info-vacancy?data=vacancy&carparkIds=${carparkID}&lang=zh_TW`
    ).then((result) => {
      if (mounted) {
        const info = result.data.results[0];
        const privateCarInfo = info.privateCar;
        const privateCarVacancy = privateCarInfo[0];

        setVacancy(privateCarVacancy.vacancy);
        setUpdateTime(privateCarVacancy.lastupdate);
      }
    });

    return () => {
      mounted = false;
    };
  }, [Id]);

  return (
    <>
      {vacancy ? (
        <Text>
          {vacancy > 0 && (
            <>
              <VStack>
                <HStack alignItems="center" space={5}>
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

                <HStack alignItems="center" space={5}>
                  <Text color="dark.900" fontSize="15px">
                    最後更新時間 :
                  </Text>
                  <Text color="dark.900">{updateTime}</Text>
                </HStack>
              </VStack>
            </>
          )}
        </Text>
      ) : !vacancy ? (
        <VStack>
          <HStack alignItems="center" space={5}>
            <Text color="dark.900" fontWeight="bold" fontSize="lg">
              剩餘車位 :
            </Text>

            <Text color="red.400" fontWeight="bold" fontSize="md">
              資料沒有提供
            </Text>
          </HStack>
        </VStack>
      ) : null}
    </>
  );
}

export default CarParkVacancyAPI;
