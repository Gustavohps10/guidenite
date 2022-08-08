import Guide from '../components/Guide'
import Item from '../components/Item'
import {SearchIcon, SettingsIcon, RingerIcon, Volume3Icon, HomeIcon, LibraryIcon, Photo2Icon, CancelIcon} from '@fluentui/react-icons-mdl2'
import loadingGif from '../assets/images/loading.gif'
import { Link } from "react-router-dom"
import React, { useState } from 'react'
import { WindowContext } from '../providers/window'
import fkill from "fkill"

export default function Main() {
    const windows = React.useContext(WindowContext);
    const [selectedWindow, setSelectedWindow] = useState(null)

    const ignoredWindows = [
        "Guidenite",
        "Microsoft Text Input Application",
        "explorer",
        "Taskmgr"
    ]

    function limitTextSize(text, count){
        return text.slice(0, count) + (text.length > count ? "..." : "");
    }

    function handleSelectedWindow(window) {
        setSelectedWindow(window)
    }

    function stopWindow() {
        fkill(selectedWindow.id, {
            force: true
        })
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
                            if(
                                !ignoredWindows.includes(window.title)
                                && !ignoredWindows.includes(window.description)
                                && !ignoredWindows.includes(window.name)
                            ){
                                return (
                                    <Item 
                                        key={window.id}  
                                        imageIsIcon image={window.icon} 
                                        text={limitTextSize(window.title, 50)}
                                        onClick={(e)=>handleSelectedWindow(window, e)}
                                    >
                                        {
                                            selectedWindow && selectedWindow.id == window.id && 
                                            <>
                                                <hr />
                                                <div 
                                                    className="options"
                                                    style={{
                                                        padding: "10px 0",
                                                        color: "#9e9e9e"
                                                    }}
                                                >
                                                    <Item small image={<CancelIcon/>} text="Fechar" onClick={stopWindow}/>
                                                </div>
                                            </>
                                            

                                        }
                                        
                                    </Item>
                
                                )
                                
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