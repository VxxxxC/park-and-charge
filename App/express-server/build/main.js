"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const running_at_1 = __importDefault(require("running-at"));
const cors_1 = __importDefault(require("cors"));
const updateCarParkInfoAPI_1 = __importDefault(require("./updateCarParkInfoAPI"));
const getCarkParkInfo_1 = __importDefault(require("./getCarkParkInfo"));
const app = (0, express_1.default)();
const PORT = 8050;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// const corsOptions = {
//    origin : 'localhost:19000'
// }
app.use('/updateCarParkInfo', updateCarParkInfoAPI_1.default);
app.use('/getCarParkInfo', getCarkParkInfo_1.default);
app.get('/', (req, res) => {
    res.json('This is Park and Charge API by AWS EC2');
});
app.listen(PORT, () => {
    console.log((0, running_at_1.default)(PORT));
    try {
        console.log(`server is started , PORT listening to ${PORT}`);
    }
    catch (err) {
        console.log(`server fail to start !! ERROR catch : ${err}`);
    }
});
