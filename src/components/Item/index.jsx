import React from 'react'
import './index.scss'

export default function Item(props) {
    return(
        <div className={`item ${props.small == true ? "small": ""} ${!props.text && props.image ? "only-image" :""} ${props.filled ? "filled": ""}`} tabIndex="0">
        
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