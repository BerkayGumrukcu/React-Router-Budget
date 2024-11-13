// rrd imports
import { Form, NavLink } from "react-router-dom";
//assets
import logomark from "../assets/logomark.svg";
//library
import { TrashIcon } from "@heroicons/react/24/solid";



const Nav = ({ userName }) => {
  return (
    <nav>
        <NavLink to="/" aria-label="Anasayfaya Dön">
            <img src={logomark} alt="" height={30}/>
            <span>HarcamaTakip</span>
        </NavLink>
        {userName && (
            <Form method="post" action="/logout" onSubmit={(event) => {
                if (!confirm("Kullanıcı ve tüm veriler silinsin mi?")) {
                    event.preventDefault()
                }
            } }>
                <button type="submit" className="btn btn--warning">
                    <span>Kullanıcıyı Sil</span>
                    <TrashIcon width={20}></TrashIcon>
                </button>
            </Form>
        )}
    </nav>
  )
}

export default Nav