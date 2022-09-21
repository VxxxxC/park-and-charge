import React, { useEffect, useState } from "react";
import { FlatList, Text } from "native-base";
import axios from "axios";

function CarParkDistrict() {
  const [data, getData]: any = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState();

  const districtList: string[] = [];

  useEffect(() => {
    let mounted = true;

    const api: any = axios(
      "https://api.data.gov.hk/v1/carpark-info-vacancy?data=info&lang=zh_TW"
    );
    api.then((res: any) => {
      if (mounted) {
        getData(res.data);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  for (let i in data.results) {
    // console.log(data.results[i].district);
    if (!districtList.includes(data.results[i].district)) {
      districtList.push(data.results[i].district);
    }
  }

  console.log(districtList);
  // data.map((res: any) => {
  //   console.log(res.district);
  // });

  return (
    <Text color="amber.500" fontSize="3xl">
      {districtList.map((item: any) => (
        <Text>{item}</Text>
      ))}
    </Text>
  );
}

export default CarParkDistrict;
