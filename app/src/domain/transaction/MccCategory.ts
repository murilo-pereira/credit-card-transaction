import { Mcc } from "./Mcc"
import { BenefitCategory } from "./BenefitCategory"

export namespace MccCategory {
    export const AVAILABLE = {
        [Mcc.MEAL_TYPE_1 as string]: BenefitCategory.MEAL,
        [Mcc.MEAL_TYPE_2 as string]: BenefitCategory.MEAL,
        [Mcc.MEAL_TYPE_3 as string]: BenefitCategory.MEAL,
        [Mcc.MEAL_TYPE_4 as string]: BenefitCategory.MEAL,
        [Mcc.FOOD_TYPE_1 as string]: BenefitCategory.FOOD,
        [Mcc.CULTURE_TYPE_1 as string]: BenefitCategory.CULTURE,
    }
}