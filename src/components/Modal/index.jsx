import "./index.scss"

export default function Modal(props) {
    return(
        <div className={`modal ${props.visible ? "visible":"hide"}`}>
            {props.children}
        </div>
    )
}