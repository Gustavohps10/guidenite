import './index.scss'
import Item from '../Item'
import testImage from '../../assets/test-image.png'

export default function Guide(){
    return (
        <div className="guide">
            <header></header>
            <div className="content">
                <div className="main-items">
                    <Item text="Test" />
                    <Item small text="Test" image={testImage}/>
                </div>
                <hr />
                <div className="games">
                    <Item image={testImage}/>
                    <Item text="Ori and the Blind Forest" image={testImage}/>
                    <Item text="Test" image={testImage}/>
                    <Item text="Test" image={testImage}/>
                    <Item text="Test" image={testImage}/>
                    <Item text="Test" image={testImage}/>
                    <Item text="Test" image={testImage}/>
                </div>
            </div>
            <footer></footer>
        </div>
    )
}