import React, {memo, useRef, useEffect} from 'react'
import './index.scss'
import { AudioContext } from '../../providers/audio'

function Item(props) {
    const {audios} = React.useContext(AudioContext)
    const itemRef = useRef(null)
    
    function playFocusSound() {
        if(!props.autoFocus){
            audios.focusAudio.currentTime = 0
        }
        audios.focusAudio.play()
    }

    function playClickSound() {
        audios.clickAudio.currentTime = 0
        audios.clickAudio.play()
    }

    useEffect(()=>{
        if(props.autoFocus){
            itemRef.current.focus()
        }
    }, [])

    function handleClick(){
        playClickSound()
        if(props.onClick){
            props.onClick()
        }
    }

    return(
        <div 
        ref={itemRef}
        onClick={handleClick} 
        onFocus={()=> playFocusSound()} 
        className={`item 
            ${props.small == true ? "small": ''} 
            ${!props.text && props.image ? "only-image" :''} 
            ${props.filled ? "filled": ''}
        `} 
        tabIndex="0"
        style={props.style}
        >
        
            {
                props.image && (
                <div className="image" style={{backgroundColor: props.imageBackgroundColor || undefined}}>
                    {
                        React.isValidElement(props.image) 
                        ? props.image 
                        : <img className={`${props.imageIsIcon ? "icon": ''}`} src={props.image} alt={props.text} />
                    }
                </div>
                )
            }

            {
                props.text && (
                    <div className="content">
                        <span className="text">{props.text}</span>
                        {props.children}
                    </div>
                )
            }
            
        </div>
    )
}

export default memo(Item, (prev, next)=>{
    if(prev.onClick){
        return false
    }

    if(!prev.children){
        return prev.text == next.text
    }
})