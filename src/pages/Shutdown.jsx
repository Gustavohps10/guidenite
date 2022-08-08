import {UpdateRestoreIcon, PowerButtonIcon, HalfAlphaIcon, BackIcon, ClearNightIcon} from "@fluentui/react-icons-mdl2" 
import { Link } from "react-router-dom"
import Guide from "../components/Guide"
import Item from "../components/Item"
import {exec} from "node:child_process"

function shutdown(argument) {
    exec("shutdown " + argument)
}
export default function Shutdown() {
    return(
        <Guide>
            <div className="content">
                    <h1><PowerButtonIcon/> <span>Opções de desligamento</span> </h1>
                    <div className="main-items">
                        <Link tabIndex="-1" to="/"><Item text="Voltar" image={<BackIcon/>}/></Link>
                    </div>
                    <hr />
                    <div className="main-items">
                        <Item onClick={()=>shutdown("/p")} text="Desligar" image={<PowerButtonIcon/> }/>
                        <Item onClick={()=>shutdown("/r /t 00")} text="Reiniciar" image={<UpdateRestoreIcon/>}/>
                        <Item  onClick={()=>shutdown("/h")} text="Hibernar" image={<ClearNightIcon/>}/>
                    </div>
                </div>
        </Guide>
    )
}