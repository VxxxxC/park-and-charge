import express from 'express';

const app = express();
const PORT = 8050;

let message1 = { 'first': 'GET response' }
let message2 = { 'second': 'GET response' }

app.get('/', (req, res, next) => {
    console.log(message1)
    next()
})
    .get('/', (req, res, next) => {
        console.log(message2)
        res.json({ message1, message2 })

    })
    .post('/', (req, res, next) => {
        console.log({ 'POST': 'response' })
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
