import { useLoaderData } from "react-router-dom";
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers"
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import { toast } from "react-toastify";

export async function budgetLoader({params}) {
    const budget = await getAllMatchingItems({
        category : "budgets",
        key : "id",
        value : params.id
    })[0];

    const expenses = await getAllMatchingItems({
        category : "expenses",
        key : "budgetId",
        value : params.id
    });


    if (!budget) {
        throw new Error("Bütçe bulunamadı.")
    }

    return { budget, expenses };
}


//action 
export async function budgetAction ({request}) {
    
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data);

if (_action === "deleteExpense") {
    try {
      //create
      deleteItem({
        key : "expenses",
        id : values.expenseId
      })
      return toast.success("Harcama silindi.");
    } catch (e) {
       throw new Error("Harcama silerken bir hata meydana geldi.", e)
    }
  }
  if (_action === "createExpense") {
    try {
      //create
      createExpense({
        name : values.newExpense,
        amount : values.newExpenseAmount,
        budgetId : values.newExpenseBudget
      })
      return toast.success("Harcama eklendi");
    } catch (e) {
       throw new Error("Harcama eklerken bir hata meydana geldi.", e)
    }
  }
}

const BudgetPage = () => {
    const { budget, expenses } = useLoaderData();

  return (
    <div className="grid-lg" style={{"--accent" : budget.color,}}>
        <h1 className="h2">
            <span className="accent">
                    {budget.name}
            </span>
            {' '} Bütçesine Genel Bakış
        </h1>
        <div className="flex-lg">
            <BudgetItem budget={budget} showDelete={true}></BudgetItem>
            <AddExpenseForm budgets={[budget]}></AddExpenseForm>
        </div>
        {
            expenses && expenses.length > 0 && (
                <div className="grid-md">
                    <h2>
                        <span className="accent">
                            {budget.name}
                        </span>
                        {' '} Harcamalarınız
                    </h2>
                    <Table expenses={expenses} showBudget={false}></Table>
                </div>
            )
        }
    </div>
  )
}

export default BudgetPage