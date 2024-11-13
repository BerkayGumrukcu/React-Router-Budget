import ExpenseItem from "./ExpenseItem"

const Table = ({expenses,showBudget = true }) => {
  return (
    <div className="table">
        <table>
            <thead>
                <tr>
                    {
                        ["Harcama Adı", "Harcanan Tutar", "Tarih", showBudget ? "Bütçe" : "", ""].map((i, index) => (
                            <th key={index}>{i}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
            {
            expenses.map((expense) => (
                    <tr key={expense.id}>
                        <ExpenseItem expense={expense} showBudget={showBudget}></ExpenseItem>
                    </tr>
                ))
            }
            </tbody>
        </table>
    </div>
  )
}

export default Table