import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom"
import PropTypes from "prop-types";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const AddExpenseForm = ({budgets}) => {
    const fetcher = useFetcher ();
    const formRef = useRef();
    const focusRef = useRef();
    const isSubmitting = fetcher.state === "submitting";

    useEffect(() => {
        if (!isSubmitting) {
            //clear form
            formRef.current.reset()
            //reset
            focusRef.current.focus()
        }
    })

  return (
    <div className="form-wrapper">
        <h2 className="h3">Yeni {" "}
            <span className="accent ">
                 {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
            </span>
            <span>{" "}
                 Harcamalarınız
            </span>
        </h2>
        <fetcher.Form method="post" className="grid-sm" ref={formRef}>
            <div className="expense-inputs">
                <div className="grid-xs">
                    <label htmlFor="newExpense">Harcama Adı</label>
                    <input type="text" name="newExpense" id="newExpense" placeholder="örn. Kahve" ref={focusRef} required/>
                </div>
                <div className="grid-xs">
                    <label htmlFor="newExpenseAmount">Miktar</label>
                    <input type="number" step="0.01" inputMode="decimal" name="newExpenseAmount" id="newExpenseAmount" placeholder="örn. 3.50" required />
                </div>
            </div>
            <div className="grid-xs" hidden={budgets.length === 1}>
                <label htmlFor="newExpenseBudget">Bütçe Kategorileriniz</label>
                <select name="newExpenseBudget" id="newExpenseBudget" required>
                    {
                        budgets
                        .sort((a,b) => a.createdAt - b.createdAt)
                        .map((budget) => {
                            return (
                                <option key={budget.id} value={budget.id}>
                                    {budget.name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>
            <input type="hidden" name="_action" value="createExpense" />
            <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                {
                    isSubmitting ? <span>Oluşturuluyor</span> : (
                        <>
                         <span>Harcama Ekle</span>
                         <PlusCircleIcon width={30}></PlusCircleIcon>
                        </>
                    )
                }
            </button>
        </fetcher.Form>
      
    </div>
  )
}

AddExpenseForm.propTypes = {
    budgets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            createdAt: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default AddExpenseForm