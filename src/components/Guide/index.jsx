import './index.scss'

export default function Guide(props){
    return (
        <div className="guide">
            <header></header>
            {props.children}
        </div>
    )
}