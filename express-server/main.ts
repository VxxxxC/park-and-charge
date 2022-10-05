import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { createClient } from 'redis';
import { MongoClient } from 'mongodb';

const redisClient = createClient();


const app = express();
const PORT = 8050;

app.use(express.json())
app.use(cors());
// const corsOptions = {
//    origin : 'localhost:19000'
// }

app.post('/carParkInfo', async (req, res, next) => {
    console.log({ 'POST': 'Frontend post request received!' })

    const response = await axios.get('https://api.data.gov.hk/v1/carpark-info-vacancy?data=info&lang=zh_TW')
    //console.log(response);
    const data = response.data.results;
    //console.log(data)

    async function runMongo() {

        const dbName = "carPark";
        const collectionName = "carParkInfo";

        const uri = "mongodb+srv://m001-student:m001-student@sandbox.cgiqc.mongodb.net/?retryWrites=true&w=majority";
        const mongoClient = new MongoClient(uri, { monitorCommands: true });

        const db = mongoClient.db(dbName);
        const collectionData = await db.listCollections().toArray();
        console.log({ collectionData })

        if (collectionData.length > 0) {
            const existCollectionName = collectionData[0].name
            console.log({ existCollectionName });
            const checkCollectionExist = (existCollectionName == collectionName);
            console.log({ checkCollectionExist })


            try {
                console.log("connect mongoDB successfully!");

                if (checkCollectionExist) {
                    const db = mongoClient.db("carPark");
                    const collection = db.collection('carParkInfo');

                    const result = await collection.drop();
                    console.log("collection drop successfully!");
                }


                const db = mongoClient.db("carPark");
                const collection = db.collection('carParkInfo');

                const result = await collection.insertMany(data)
                console.log(
                    `inserted data : ${result.insertedCount}`
                );

            } finally {
                console.log("disconnecting mongoDB...")
                await mongoClient.close();
                console.log("mongodb disconnected!")
            }
        }
        else {
            try {
                console.log("connect mongoDB successfully!");
                const db = mongoClient.db("carPark");
                const collection = db.collection('carParkInfo');

                const result = await collection.insertMany(data)
                console.log(
                    `inserted data : ${result.insertedCount}`
                );

            }
            finally {
                console.log("disconnecting mongoDB...")
                await mongoClient.close();
                console.log("mongodb disconnected!")
            }
        }


        // try {
        //         console.log("connect mongoDB successfully!");

        //         const db = mongoClient.db("carPark");
        //         const collection = db.collection('carParkInfo');

        //         const result = await collection.insertMany(data)
        //         console.log(
        //             `inserted data : ${result.insertedCount}`
        //         );

        //     }

    }
    runMongo().catch((err) => {
        console.error({ err })
    })

    //redisClient.on('error', (err) => console.error("Redis Error : ", err))
    //await client.connect();

    /*
    try {
        await data.forEach((item: any) => {
            redisClient.set(`${item["district"]}`, `${item}`)
        })
    }
    catch (err) {
        console.error("Redis set Error : ", err);
    }
    */

    //const dataInfo = await redisClient.get('元朗區');

    //await redisClient.disconnect();
    res.json({ 'POST': 'response' })
})

app.listen(PORT, () => {
    try {
        console.log(`server is started , PORT listening to ${PORT}`);
    }
    catch (err) {
        console.log(`server fail to start !! ERROR catch : ${err}`)
    }
})
