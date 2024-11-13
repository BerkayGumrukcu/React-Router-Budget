import { Form } from "react-router-dom"

//library
import { UserPlusIcon } from "@heroicons/react/24/solid"

//assets
import illustration from "../assets/illustration.jpg"

const Intro = () => {
  return (
    <div className="intro">
        <div>
            <h1>
            Paranızı Yönetin <span className="accent">Hayatınızı Değiştirin</span>
            </h1>
            <p>
                Kişisel bütçeleme finansal özgürlüğün sırrıdır. Yolculuğunuza bugün başlayın.
            </p>
            <Form method="post">
                <input type="text" name="userName" required placeholder="İsminiz nedir?" aria-label="İsminiz" autoComplete="given-name" />
                <input type="hidden" name="_action" value="newUser" />
                <button type="submit" className="btn btn--dark">
                    <span>Hesap Oluşturun</span>
                    <UserPlusIcon width={20}></UserPlusIcon>
                </button>
            </Form>
        </div>
        <img src={illustration} alt="" width={800} />
    </div>
  )
}

export default Intro