import Guide from '../components/Guide'
import Item from '../components/Item'
import {SearchIcon, SettingsIcon, RingerIcon, Volume3Icon, HomeIcon, LibraryIcon, Photo2Icon} from '@fluentui/react-icons-mdl2'
import testImage from '../assets/images/test-image.png'
import { Link } from "react-router-dom"

export default function Main() {
    return (
        <Guide>
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
                <Item filled image={<RingerIcon />}/>
                <Link tabIndex="-1" to="/gallery"><Item filled image={<Photo2Icon/>}/></Link>
                <Item filled image={<SearchIcon />}/>
                <Link tabIndex="-1" to="/sound"><Item filled image={<Volume3Icon/>}/></Link>
                <Item filled image={<SettingsIcon/>}/> 
            </footer>   
        </Guide>
    )
}