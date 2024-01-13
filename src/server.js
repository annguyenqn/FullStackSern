import Express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./routes/web"
import connectDB from "./config/connectDB"
import cors from 'cors';
require('dotenv').config()

const app = Express()
app.use(cors({ credentials: true, origin: true }));



//config app

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app)
initWebRoutes(app)
connectDB();
//nếu chưa khai port ở env thì nó sẽ chạy ở port 6969
const port = process.env.PORT || 6969

app.listen(port, () => {
    //callback
    console.log("back-end nodejs run success at:" + port);
})
