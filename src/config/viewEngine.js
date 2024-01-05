import Express from "express";

let configViewEngine = (app) => {
    // cho phía client biết được dùng những file nào
    app.use(Express.static("./src/public"))

    app.set("view Engine", "ejs");

    app.set("views", "./src/views")

}
module.exports = configViewEngine;