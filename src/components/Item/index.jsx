import './index.scss'

export default function Item(props) {
    
    return(
        <div className={`item ${props.small == true ? "small": ""}`} tabIndex="0">
            
            {
                props.image &&
                <div className="image">
                    <img src={props.image} alt={props.text} />
                </div>
            }

            
            <div className="content">
                <span>{props.text}</span>
            </div>
        </div>
    )
}