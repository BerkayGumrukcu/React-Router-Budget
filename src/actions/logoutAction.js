import { redirect } from "react-router-dom";
import { deleteItem } from "../helpers";
import { toast } from "react-toastify";

export async function logoutAction() {
    //delete
    deleteItem({
        key : "userName",
    })
    deleteItem({
        key : "budgets",
    })
    deleteItem({
        key : "expenses",
    })
    
    toast.success("Kullanıcı silindi.")
    //return
    return redirect("/")
}