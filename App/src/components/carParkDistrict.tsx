import React, { useEffect, useState } from "react";
import { Center, CheckIcon, Select, Text } from "native-base";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";

function CarParkDistrict() {
  type districtState = string[];

  const districtList: districtState = [];

  const [data, getData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems]: any = useState([districtList]);

  useEffect(() => {
    let mounted = true;

    axios
      .get(`${process.env.REACT_NATIVE_APP_EXPRESS_API}/getCarParkInfo`)
      .then((response) => {
        if (mounted) {
          // console.log(response.data.res);
          getData(response.data.res);
          setLoading(false);
        }
        return;
      })
      .catch((error) => {
        console.error(error.response.headers);
        console.error(error.response.status);
        console.error(error.response.data);
      });

    return () => {
      mounted = false;
    };
  }, []);

  for (let i in data) {
    // console.log(data[i].district);
    // if (
    //   !Object.is(districtList, {
    //     label: data[i].district,
    //     value: data[i].district,
    //   })
    // ) {
    //   districtList.push({
    //     label: data[i].district,
    //     value: data[i].district,
    //   });
    // } else return;
    if (!districtList.includes(data[i]["district"])) {
      districtList.push(data[i]["district"]);
    } 
  }

  // console.log(districtList);
  // data.map((res: any) => {
  //   console.log(res.district);
  // });

  return (
    // <Text color="amber.500" fontSize="3xl">
    //   {districtList.map((item: any) => (
    //     <Text>{item}</Text>
    //   ))}
    // </Text>

    <>
      <Center bg="amber.500">
        <Text fontSize="2xl" color="dark.900">
          This is area districtList
        </Text>
      </Center>
    </>

    //  <DropDownPicker
    //   open={open}
    //   value={value}
    //   items={items}
    //   setOpen={setOpen}
    //   setValue={setValue}
    //   setItems={setItems}
    // />
  );
}

export default CarParkDistrict;
