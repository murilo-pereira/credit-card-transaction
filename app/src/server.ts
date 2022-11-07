import { config } from "dotenv"
import { createExpressServer } from 'routing-controllers'
import { Configurations } from "./libraries/utils/Configurations"
import { RoutesController } from "./http/controllers/RoutesController"

config()

const routesController = new RoutesController()

const app = createExpressServer({
    routePrefix: '/api',
    controllers: routesController.getControllers()
})

app.listen(Configurations.getServerPort(), () => console.log(`[${Configurations.getEnvironment()}] - server running on port ${Configurations.getServerPort()}`))
