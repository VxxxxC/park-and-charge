import express from 'express';
import cors from 'cors';
import axios from 'axios';

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
    const data = response.data.results;
    console.log(data)
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
