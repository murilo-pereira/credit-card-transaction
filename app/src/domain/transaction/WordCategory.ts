import { BenefitCategory } from "./BenefitCategory"

export namespace WordCategory {
    export const WORD_CATEGORY = {
        ['eats' as string]: BenefitCategory.MEAL,
        ['padaria' as string]: BenefitCategory.MEAL,
        ['restaurant' as string]: BenefitCategory.MEAL,
        ['restaurante' as string]: BenefitCategory.MEAL,
        ['bar' as string]: BenefitCategory.MEAL,
        ['supermarket' as string]: BenefitCategory.FOOD,
        ['supermercado' as string]: BenefitCategory.FOOD,
        ['grocery' as string]: BenefitCategory.FOOD,
        ['mercearia' as string]: BenefitCategory.FOOD,
        ['bookstore' as string]: BenefitCategory.CULTURE,
        ['livraria' as string]: BenefitCategory.CULTURE,
        ['netflix' as string]: BenefitCategory.CULTURE,
        ['spotify' as string]: BenefitCategory.CULTURE,
        ['streaming' as string]: BenefitCategory.CULTURE,
    }
}