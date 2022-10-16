import React, { useEffect, useState } from "react";
import { Center, CheckIcon, Select, Text } from "native-base";
import axios from "axios";
import DropDownPicker from 'react-native-dropdown-picker';

function CarParkDistrict() {
  type itemType = {
      label: string,
      value: string,
  }

    const districtList: string[] = [];


  const [data, getData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState<itemType[]>([])

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

  useEffect(()=>{
      for (let i in data) {
          if (!districtList.includes(data[i]["district"])) {
              districtList.push(data[i]["district"]);
          }
      }
      //   console.log(districtList);

      let listItem:itemType[] = districtList.map<itemType>((res: any) => ({
          label : res,
          value : res,
      }));
      setItems(listItem)
  },[data])

    console.log(items)


  return (
    // <Text color="amber.500" fontSize="3xl">
    //   {districtList.map((item: any) => (
    //     <Text>{item}</Text>
    //   ))}
    // </Text>

//    <>
//      <Center bg="amber.500">
//        <Text fontSize="2xl" color="dark.900">
//          This is area districtList
//        </Text>
//      </Center>
//    </>

  <DropDownPicker
      multiple={true}
      min={0}
      max={18}
      placeholder={"選擇區域"}
      placeholderStyle={{fontSize: 30}}
      labelStyle={{}}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
  />

  );
}

export default CarParkDistrict;
