
// helper
import { Link, useLoaderData } from "react-router-dom";
import { createBudget, createExpense, deleteItem, fetchData, wait } from "../helpers"
import Intro from "../components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

export function dashboardLoader(){
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");
    return { userName, budgets, expenses }
}

//action
export async function dashboardAction({request}) {
  await wait();
  const data = await request.formData();
  const {_action, ...values} = Object.fromEntries(data);
  if (_action == "newUser") {
      try {
      localStorage.setItem("userName", JSON.stringify(values.userName))
      return toast.success(`Hoşgeldin, ${values.userName}`)
      } catch (e) {
        throw new Error("Giriş Başarısız.", e);
      }
  }
  if (_action === "createBudget") {
    try {
      //create
      createBudget({
        name : values.newBudget,
        amount : values.newBudgetAmount,
      })
      return toast.success("Bütçe oluşturuldu");
    } catch (e) {
       throw new Error("Bütçenizi oluştururken bir hata meydana geldi.", e)
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
}



const Dashboard = () => {

   const { userName, budgets, expenses } = useLoaderData()

  return (
    <div>
        {userName ? ( <div className="dashboard">
          <h1>Hoşgeldin, <span className="accent">{userName}</span></h1>
          <div className="grid-sm">
          {   
            budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                  <div className="flex-lg">
                      <AddBudgetForm></AddBudgetForm>
                      <AddExpenseForm budgets = {budgets}></AddExpenseForm>
                  </div>
                  <h2>Bütçe Harcamaları</h2>
                  <div className="budgets">
                      {
                        budgets.map((budget) => (
                          <BudgetItem key={budget.id} budget={budget}></BudgetItem>
                        ))
                      }
                  </div>
                  {
                    expenses && expenses.length > 0 && (
                      <div className="grid-md">
                        <h2>Son Harcamalar</h2>
                        <Table expenses={expenses.sort((a,b) => b.createdAt 
                        - a.createdAt)
                        .slice(0,8)
                        }></Table>
                        {
                          expenses.length > 8 && (
                            <Link to="expenses" className="btn btn--dark">
                              Tüm Harcamaları Göster
                            </Link>
                          )
                        }
                      </div>
                    )
                  }
              </div>
            ) : (
              <div className="grid sm">
                <p>Kişisel bütçeleme finansal özgürlüğün sırrıdır.</p>
                <p>Yolculuğunuza bugün başlayın.</p>
                <AddBudgetForm></AddBudgetForm>
              </div>
            )      
          }
          </div>
        </div>
      ) : <Intro></Intro>}
    </div>
  )
}

export default Dashboard