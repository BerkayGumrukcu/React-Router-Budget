import { Form, Link, useFetcher } from "react-router-dom";
import { formatCurrency, formatDateToLocaleString, getAllMatchingItems } from "../helpers"
import { TrashIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

const ExpenseItem = ({expense, showBudget}) => {

  const fetcher = useFetcher ();

  const budget = getAllMatchingItems({
    category : "budgets",
    key : "id",
    value : expense.budgetId,
  })[0];


  return (
    <>
    <td>{expense.name}</td>
    <td>{formatCurrency(expense.amount)}</td>
    <td>{formatCurrency(formatDateToLocaleString(expense.createdAt))}</td>
    {  showBudget && (
      <td>
      <Link to={`/budget/${budget.id}`} style={{
      "--accent" : budget.color,
    }}>
      {budget.name}
      </Link>
      </td>)}
    <td>
      <fetcher.Form method="post">
        <input type="hidden" name="_action" value="deleteExpense" />
        <input type="hidden"name="expenseId" value={expense.id} />
        <button type="submit" className="btn btn--warning"
        aria-label={`${expense.name} Harcamanızı Silin `}>
          <TrashIcon width={20}></TrashIcon>
        </button>
      </fetcher.Form>
    </td>
    </>
  )
}

ExpenseItem.propTypes = {
  expense: PropTypes.arrayOf(
      PropTypes.shape({
          name: PropTypes.string.isRequired,
          createdAt: PropTypes.number.isRequired,
      })
  ).isRequired,
};

export default ExpenseItem