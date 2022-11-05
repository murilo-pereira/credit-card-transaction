import { TransactionController } from "./TransactionController"
import { AccountController } from "./AccountController"

export class RoutesController {
    public getControllers(): Function[] | string[] {
        return [
            TransactionController,
            AccountController
        ]
    }
}