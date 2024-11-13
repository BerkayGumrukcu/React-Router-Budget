import { useLoaderData } from "react-router-dom";
import { deleteItem, fetchData } from "../helpers";
import Table from "../components/Table";
import { toast } from "react-toastify";



export function expensesLoader(){
    const expenses =  fetchData("expenses");
    return {expenses }
}

//action 
export async function expensesAction ({request}) {
    
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
}


const ExpensesPage = () => {
    const {expenses} = useLoaderData()


  return (
    <div className="grid-lg">
        <h1>Tüm Harcamalarınız</h1>
        {
            expenses && expenses.length > 0 ? (
                <div className="grid-md">
                        <h2>Son Harcamalar <small>({expenses.length} total)</small></h2>
                        <Table expenses={expenses}></Table>
                </div>
            ) : <p> Görüntüleyebilecek başka harcamanız yok</p>
        }
    </div>
  )
}

export default ExpensesPage