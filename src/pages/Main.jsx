import Guide from '../components/Guide'
import Item from '../components/Item'
import {SearchIcon, SettingsIcon, RingerIcon, Volume3Icon, HomeIcon, LibraryIcon, Photo2Icon} from '@fluentui/react-icons-mdl2'
import loadingGif from '../assets/images/loading.gif'
import { Link } from "react-router-dom"
import React from 'react'
import { WindowContext } from '../providers/window'

export default function Main() {
    const windows = React.useContext(WindowContext);

    function limitTextSize(text, count){
        return text.slice(0, count) + (text.length > count ? "..." : "");
    }

    return (
        <Guide>
            <div className="content">
                <div className="main-items">
                    <Item image={<HomeIcon/>} text="Home" />
                    <Item image={<LibraryIcon/>} text="Biblioteca" />
                </div>
                <hr />
                <div className="games">
                    {
                        windows.length == 0 &&
                        <img style={{
                            width: "32px",
                            height: "32px",
                            left: "50%",
                            position: "relative",
                            transform: "translateX(-50%)"
                        }} src={loadingGif} alt="loading" />
                    }

                    { windows.length > 0 &&
                        windows.map(window =>{
                            if(window.title != "Guidenite" && window.title != "Microsoft Text Input Application"){
                                return <Item 
                                    key={window.id}  
                                    imageIsIcon image={window.icon} 
                                    text={limitTextSize(window.title, 50)}
                                />
                            }
                            
                        })
                    }
                    
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