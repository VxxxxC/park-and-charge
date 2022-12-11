import axios from 'axios';
import { HStack, VStack, Text } from 'native-base';
import React, { useEffect, useState, useCallback } from 'react';

function CarParkVacancyAPI({ Id }: any) {
  let carparkID = Id;
  //   console.log(carparkID);
  const [updateTime, setUpdateTime] = useState('');
  const [vacancy, setVacancy] = useState<number>(0);

  const fetchData = useCallback(() => {
    axios(
      `https://api.data.gov.hk/v1/carpark-info-vacancy?data=vacancy&carparkIds=${carparkID}&lang=zh_TW`
    ).then((result) => {
      const info = result.data.results[0];
      const privateCarInfo = info.privateCar;
      const privateCarVacancy = privateCarInfo[0];

      setVacancy(privateCarVacancy.vacancy);
      setUpdateTime(privateCarVacancy.lastupdate);
    });
  }, [Id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {vacancy ? (
        <Text>
          {vacancy > 0 && (
            <>
              <VStack>
                <HStack alignItems="center" space={5}>
                  <Text color="dark.50" fontWeight="bold" fontSize="md">
                    剩餘車位 :
                  </Text>
                  {vacancy < 30 ? (
                    <Text color="red.600" fontSize="md" fontWeight="bold">
                      {vacancy}
                    </Text>
                  ) : (
                    <Text color="green.600" fontSize="md" fontWeight="bold">
                      {vacancy}
                    </Text>
                  )}
                </HStack>

                <HStack alignItems="center" space={5}>
                  <Text color="dark.50" fontSize="sm">
                    最後更新時間 :
                  </Text>
                  <Text color="dark.50" fontSize="sm">
                    {updateTime}
                  </Text>
                </HStack>
              </VStack>
            </>
          )}
        </Text>
      ) : !vacancy ? (
        <VStack>
          <HStack alignItems="center" space={5}>
            <Text color="dark.50" fontWeight="bold" fontSize="sm">
              剩餘車位 :
            </Text>

            <Text color="red.400" fontWeight="bold" fontSize="sm">
              資料沒有提供
            </Text>
          </HStack>
        </VStack>
      ) : null}
    </>
  );
}

export default CarParkVacancyAPI;
