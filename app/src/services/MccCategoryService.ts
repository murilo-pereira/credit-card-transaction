import { MccCategory } from "../domain/transaction/MccCategory"
import { WordCategory } from "../domain/transaction/WordCategory"

export class MccCategoryService {
    public getCategoryLowerCaseByMcc(mcc: string): string | undefined {
        const category = MccCategory.AVAILABLE[mcc]

        if(category){
            return category.toLowerCase()
        }

        return category
    }

    public getCategoryLowerCaseByMerchant(merchant: string): string | undefined{
        const words = Object.keys(WordCategory.WORD_CATEGORY)

        let key: string | undefined

        words.forEach((word) => {
            if(merchant.toLowerCase().includes(word)) {
                key = word
            }
        })

        if(!key){
            return key
        }

        const category = WordCategory.WORD_CATEGORY[key]

        if(category){
            return category.toLowerCase()
        }

        return category
    }
}