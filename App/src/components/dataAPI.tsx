import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "native-base";
import axios from "axios";

function DataAPI() {
    const [result, getResult] = useState([]);

    useEffect(() => {
        axios.get(
            "https://api.data.gov.hk/v1/historical-archive/get-file?url=https%3A%2F%2Fwww.ofca.gov.hk%2Ffilemanager%2Fofca%2Fcommon%2Fdatagovhk%2FPayPhoneRegister.csv&amp;time=20220201-1322"
        ).then((data: any) => getResult(data.data));
    }, [])
    //console.log(result)

    return (
        <ScrollView>
            <Text>
                {result}
            </Text>
        </ScrollView>
    );
}
export default DataAPI;
