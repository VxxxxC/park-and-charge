import axios from "axios";
import Papa from "papaparse";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CarParkVacancyAPI from "./carParkVacancyAPI";
import Spacer from "./spacer";
import {
    Center,
    FlatList,
    HStack,
    Image,
    Text,
    View,
    VStack,
} from "native-base";

function CarParkInfoAPI() {
    const [data, getData] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let mounted = true;
        const api: any = axios(
            "https://api.data.gov.hk/v1/carpark-info-vacancy?data=info&lang=zh_TW"
        );
        api.then((res: any) => {
            if (mounted) {
                // console.log("this is imported carPark Info API data : ", res.data.results);
                getData(res.data.results);
                setLoading(false);
            }
        });

        return () => {
            mounted = false;
        };
    }, []);

    // console.log(data);

    return (
        <>
            {loading ? (
                <Text color="dark.900" fontSize="15px">
                    Loading...
                </Text>
            ) : (
                <VStack>
                    <FlatList
                        data={data}
                        renderItem={({ item }: any) => (
                            <>
                                <HStack p="3">
                                    <Text color="dark.900" fontWeight="bold" fontSize="xl">
                                        {item["name"]}
                                    </Text>
                                </HStack>

                                {/* FIXME: for developer use only */}
                                <HStack p="3">
                                    <Text color="dark.900" fontWeight="bold" fontSize="lg">
                                        停車場編號 :{" "}
                                    </Text>
                                    <Text color="dark.900" fontSize="lg">
                                        {item["park_Id"]}
                                    </Text>
                                </HStack>

                                {item["paymentMethods"] ? (
                                    <VStack p="3">
                                        <Text color="dark.900" fontWeight="bold" fontSize="lg">
                                            付款方式 :{" "}
                                        </Text>
                                        <Text color="amber.400" fontSize="2xl" fontWeight="bold">
                                            {[item["paymentMethods"]].join()}
                                        </Text>
                                    </VStack>
                                ) : null}

                                <VStack mt="10" p="3">
                                    <CarParkVacancyAPI Id={item["park_Id"]} />
                                </VStack>

                                <VStack p="3">
                                    <Text color="dark.900" fontWeight="bold" fontSize="lg">
                                        地址 :{" "}
                                    </Text>
                                    <Text color="dark.900" fontSize="lg">
                                        {item["district"]}, {item["displayAddress"]}
                                    </Text>
                                </VStack>

                                {item["renditionUrls"] ? (
                                    <HStack p="3">
                                        <Image
                                            source={{
                                                uri: `${item["renditionUrls"]["carpark_photo"]}`,
                                            }}
                                            size="2xl"
                                            alt="Text"
                                        />
                                    </HStack>
                                ) : null}
                                <Spacer />
                            </>
                        )}
                        keyExtractor={(item) => item["park_Id"]}
                    />
                </VStack>
            )}
        </>
    );
}

export default CarParkInfoAPI;
