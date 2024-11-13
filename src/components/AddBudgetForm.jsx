import { CurrencyDollarIcon } from "@heroicons/react/24/solid"
import { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom"

const AddBudgetForm = () => {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";

    const formRef = useRef();
    const focusRef = useRef();

    useEffect(() => {
        if (!isSubmitting) {
            formRef.current.reset()
            focusRef.current.focus()
        }
    }, [isSubmitting])
  return (
    <div className="form-wrapper">
        <h2 className="h3">
            Bütçe Oluştur
        </h2>
        <fetcher.Form method="post" className="grid-sm" ref={formRef}>
            <div className="grid-xs">
                <label htmlFor="newBudget">Bütçe Adı</label>
                <input type="text" name="newBudget" id="newBudget" required ref={focusRef}/>
            </div>
            <div className="grid-xs">
                <label htmlFor="newBudgetAmount">Miktar</label>
                <input type="text" step="0.01" name="newBudgetAmount" id="newBudgetAmount" required placeholder="350TL" inputMode="decimal"/>
            </div>
            <input type="hidden" name="_action" value="createBudget" />
            <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
                {
                    isSubmitting ? <span>Oluşturuluyor</span> : (
                        <>
                         <span>Bütçe Oluştur</span>
                         <CurrencyDollarIcon width={30}></CurrencyDollarIcon>
                        </>
                    )
                }
            </button>
        </fetcher.Form>
    </div>
  )
}

export default AddBudgetForm