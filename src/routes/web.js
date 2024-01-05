import Express from "express";
const router = Express.Router();
import homeController from "../controllers/homeController";
const initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)

    return app.use("/", router);
}
module.exports = initWebRoutes;