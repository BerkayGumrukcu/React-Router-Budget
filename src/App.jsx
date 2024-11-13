import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

//
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import Main, { mainLoader } from "./layouts/Main";
import { logoutAction } from "./actions/logoutAction";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpensesPage, { expensesAction, expensesLoader } from "./pages/ExpensesPage";
import BudgetPage, { budgetAction, budgetLoader } from "./pages/BudgetPage";
import { deleteBudget } from "./actions/deleteBudget";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    loader : mainLoader,
    errorElement : <Error></Error>,
    children : [ 
        {
          index : true,
          element: <Dashboard></Dashboard>,
          loader : dashboardLoader,
          action : dashboardAction,
          errorElement : <Error></Error>
        },
        {
          path : "expenses",
          element: <ExpensesPage></ExpensesPage>,
          loader : expensesLoader,
          action : expensesAction,
          errorElement : <Error></Error>
        },
        {
          path : "budget/:id",
          element: <BudgetPage></BudgetPage>,
          loader : budgetLoader,
          action : budgetAction,
          errorElement : <Error></Error>,
          children : [
              {
                path : "delete",
                action : deleteBudget,
              }
          ]
        },
        {
          path : "logout",
          action : logoutAction
        }
    ]
  },
]);

function App() {

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default App
