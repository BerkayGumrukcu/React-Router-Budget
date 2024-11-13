import { Form, Link } from "react-router-dom";
import { calculateSpentByBudget, formatCurrency, formatPercentage } from "../helpers";
import PropTypes from 'prop-types';
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";


const BudgetItem = ({budget, showDelete = false }) => {
    const {id, name, amount, color } = budget;
    const spent = calculateSpentByBudget(id);

  return (
    <div className="budget" style={{"--accent":color}}>
            <div className="progress-text">
                <h3>{name}</h3>
                <p>{formatCurrency(amount)} Bütçe</p>
            </div>
            <progress max={amount} value={spent}>
                {formatPercentage(spent / amount)}
            </progress>
            <div className="progress-text">
                <small>{formatCurrency(spent)} harcanan</small>
                <small>{formatCurrency(amount - spent)} kalan</small>
            </div>
            {
              showDelete ? (
                <div className="flex-sm">
                  <Form method="post" action="delete" onSubmit={(event) =>{
                    if (!confirm("Bütçeyi kalıcı olarak silmek istediğinize emin misiniz?")) {
                      event.preventDefault();
                    }
                  }}>
                    <button type="submit" className="btn">
                    <span>Bütçeyi Sil</span>
                    <TrashIcon width={20}></TrashIcon></button>
                  </Form>
                </div>
              ) : (
                <div className="flex-sm">
                   <Link to={`/budget/${id}`} className="btn">
                    <span>Detayları Görüntüle</span>
                    <BanknotesIcon width={20}></BanknotesIcon>
                  </Link>
                </div>
              )
            }
        </div>
  )
}

BudgetItem.propTypes = {
    budget: PropTypes.shape({
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }).isRequired,
  };

export default BudgetItem