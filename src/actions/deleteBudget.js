import { toast } from "react-toastify"
import { deleteItem, getAllMatchingItems } from "../helpers"
import { redirect } from "react-router-dom";

export async function deleteBudget({params}) {
    //delete
    try {
         deleteItem({
        key : "budgets",
        id : params.id,
        });
        
        const associatedExpenses = getAllMatchingItems({
            category: "expenses",
            key : "budgetId",
            value : params.id
        });

        associatedExpenses.forEach((expense) => {
            deleteItem({
                key : "expenses",
                id : expense.id
            })
        });

        toast.success("Bütçe silindi.")
    } catch (Error) {
        throw new Error("Bütçe silinirken bir hata meydana geldi")
    }
    return redirect('/');
}