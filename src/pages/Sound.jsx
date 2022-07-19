import Guide from "../components/Guide";
import Item from "../components/Item";
import {Link} from "react-router-dom"

export default function Sound(){
    return (
        <Guide>
            <div>
                <Link tabIndex="-1" to="/">Voltar</Link>
            </div>
        </Guide>
    )
}