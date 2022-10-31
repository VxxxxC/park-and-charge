import express from 'express';
import runningAt from 'running-at';
import cors from 'cors';
import updateAPI from './updateCarParkInfoAPI'
import carParkInfo from './getCarkParkInfo'


const app = express();
const PORT = 8050;

app.use(express.json())
app.use(cors());
// const corsOptions = {
//    origin : 'localhost:19000'
// }

app.use('/updateCarParkInfo', updateAPI);
app.use('/getCarParkInfo', carParkInfo);

app.get('/', (req, res) => {
  res.json('This is Park and Charge API by AWS EC2')
})

app.listen(PORT, () => {
  console.log(runningAt(PORT))
  try {
    console.log(`server is started , PORT listening to ${PORT}`);
  }
  catch (err) {
    console.log(`server fail to start !! ERROR catch : ${err}`)
  }
})
