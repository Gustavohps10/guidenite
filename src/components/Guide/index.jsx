import './index.scss'

export default function Guide(props){
    return (
        <div className={`guide ${props.hide ? "hide":''}`}>
            <header></header>
            {props.children}
        </div>
    )
}