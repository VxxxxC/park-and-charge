import React, { useEffect, useState } from "react";
import { Center, CheckIcon, Select, Text } from "native-base";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";

function CarParkDistrict() {
    type districtState = [
        {
            label: string;
            value: string;
        } | null
    ];

    const districtList = [];

    const [data, getData]: any = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    // const [items, setItems] = useState<districtState>([districtList]);

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
        if (
            !Object.is(districtList, {
                label: data.results[i].district,
                value: data.results[i].district,
            })
        ) {
            districtList.push({
                label: data.results[i].district,
                value: data.results[i].district,
            });
        }
    }

    //  console.log(districtList);
    // data.map((res: any) => {
    //   console.log(res.district);
    // });

    return (
        // <Text color="amber.500" fontSize="3xl">
        //   {districtList.map((item: any) => (
        //     <Text>{item}</Text>
        //   ))}
        // </Text>

        <Center bg="amber.500">
            <Text fontSize="2xl" color="dark.900">This is area districtList</Text>
        </Center>
        // <DropDownPicker
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
