import "./index.scss"

export default function Modal(props) {
    return(
        <div style={props.style} className={`modal ${props.visible ? "visible":"hide"}`}>
            {props.children}
        </div>
    )
}