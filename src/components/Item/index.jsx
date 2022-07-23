import React, {memo, useEffect} from 'react'
import './index.scss'
import { AudioContext } from '../../providers/audio'

function Item(props) {
    const {audios} = React.useContext(AudioContext)
    console.log("comum item")
    function playFocusSound() {
        audios.focusAudio.currentTime = 0
        audios.focusAudio.play()
    }

    return(
        <div onClick={props.onClick} onFocus={playFocusSound} className={`item ${props.small == true ? "small": ""} ${!props.text && props.image ? "only-image" :""} ${props.filled ? "filled": ""}`} tabIndex="0">
        
            {
                props.image && (
                <div className="image">
                    {
                        React.isValidElement(props.image) 
                        ? props.image 
                        : <img src={props.image} alt={props.text} />
                    }
                </div>
                )
            }

            {
                props.text && (
                    <div className="content">
                        <span>{props.text}</span>
                        {props.children}
                    </div>
                )
            }
            
        </div>
    )
}


export default memo(Item, (prev, next)=>{
    if(!prev.children){
        return prev.text == next.text
    }
})