import React, { useEffect, useState } from "react";
import { Center, CheckIcon, Select, Text } from "native-base";
import Spacer from "./spacer"
import axios from "axios";
import DropDownPicker from 'react-native-dropdown-picker';
import CarParkInfoAPI from "./carParkInfoAPI";
import { useAppDispatch } from './redux/hooks'
import { fetchDistrict } from "./redux/reducer";

function CarParkDistrict() {
  type itemType = {
    label: string,
    value: string,
  }

  const dispatch = useAppDispatch();

  const districtList: string[] = [];


  const [data, getData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState<itemType[]>([])

  useEffect(() => {
    let mounted = true;

    axios
      .post(`${process.env.REACT_NATIVE_APP_EXPRESS_API}/getCarParkInfo`)
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

  useEffect(() => {
    data.map((item: any) => {
      if (!districtList.includes(item.district) && item.district !== undefined) {
        districtList.push(item.district);
      }
      if (!districtList.includes(item?.address?.dcDistrict) && !item.district && item?.address?.dcDistrict) {
        districtList.push(item?.address?.dcDistrict)
      }
    })

    // console.log(districtList);

    let listItem: itemType[] = districtList.map<itemType>((res: any) => ({
      label: res,
      value: res,
    }));
    setItems(listItem)
  }, [data])

  // console.log(items)

  useEffect(() => {
    dispatch(fetchDistrict(value))
  }, [value])

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

    <>
      <DropDownPicker
        placeholder={"選擇區域"}
        style={{
          backgroundColor: "white",
        }}
        textStyle={{
          fontSize: 25,
        }}
        labelStyle={{ fontWeight: "bold" }}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <Center>
        <Text color="dark.900">carParkDistrict: {value} </Text>
      </Center>
      <Spacer />
      <CarParkInfoAPI carParkDistrict={value} />
    </>

  );
}

export default CarParkDistrict;
