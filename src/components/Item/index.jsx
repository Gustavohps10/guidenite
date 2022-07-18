import React, {useEffect} from 'react'
import './index.scss'
import { AudioContext } from '../../providers/audio'

export default function Item(props) {
    const {audios} = React.useContext(AudioContext)
    
    function playFocusSound() {
        audios.focusAudio.currentTime = 0
        audios.focusAudio.play()
    }
    
    return(
        <div onFocus={playFocusSound} className={`item ${props.small == true ? "small": ""} ${!props.text && props.image ? "only-image" :""} ${props.filled ? "filled": ""}`} tabIndex="0">
        
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
                    </div>
                )
            }
            
        </div>
    )
}