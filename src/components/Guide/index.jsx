import './index.scss'
import Item from '../Item'
import testImage from '../../assets/test-image.png'

import {SearchIcon, SettingsIcon, ShareIcon, Volume3Icon, MessageIcon, HomeIcon, LibraryIcon} from '@fluentui/react-icons-mdl2'

export default function Guide(){
    return (
        <div className="guide">
            <header></header>
            <div className="content">
                <div className="main-items">
                    <Item image={<HomeIcon/>} text="Home" />
                    <Item image={<LibraryIcon/>} text="Biblioteca" />
                </div>
                <hr />
                <div className="games">
                    <Item text="TEST TEST"/>
                    <Item text="Ori and the Blind Forest" image={testImage}/>
                    <Item text="Test" image={testImage}/>
                    <Item text="Test" image={testImage}/>
                </div>
            </div> 
            <footer>
                <Item filled image={<MessageIcon />}/>
                <Item filled image={<ShareIcon/>}/>
                <Item filled image={<SearchIcon />}/>
                <Item filled image={<Volume3Icon/>}/>
                <Item filled image={<SettingsIcon/>}/>
            </footer>
        </div>
    )
}