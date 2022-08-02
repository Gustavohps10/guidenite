import "./index.scss"
import { AudioContext } from '../../providers/audio'
import React, {useRef, useState} from "react"

export default function InputText(props) {
    const {audios} = React.useContext(AudioContext)
    const [active, setActive] = useState(false)
    const inputRef = useRef()

    function playFocusSound() {
        audios.focusAudio.currentTime = 0
        audios.focusAudio.play()
    }

    function handleFocus() {
        playFocusSound()
        inputRef.current.focus()
        setActive(true)
    }

    return(
        <div 
            className={`input-text ${active?"active": ''}`} 
            tabIndex="0"
            onFocus={()=>handleFocus()}
        >
            {props.icon &&
                <div className="icon">
                    {props.icon}
                </div>
            }
            <input 
                ref={inputRef}
                value={props.value}
                placeholder={props.placeholder} 
                type="text" 
                tabIndex="-1"
                onBlur={()=>setActive(false)}
                onChange={props.onChange}
            />
        </div>
    )
}