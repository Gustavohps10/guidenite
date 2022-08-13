import { BackIcon, PhotoCollectionIcon, SearchIcon } from "@fluentui/react-icons-mdl2";
import { Link } from "react-router-dom";
import Guide from "../components/Guide";
import Item from "../components/Item";
import fs from "fs"
import path from "path"
import React, { useEffect, useState } from "react";
import "../styles/screenshots.scss"
import { AudioContext } from '../providers/audio'
import InputText from "../components/InputText";

export default function Screenshots() {
    const [screenshots, setScreenshots] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const dirpath = path.join(__dirname, '/screenshots/')
    const {audios} = React.useContext(AudioContext)

    useEffect(()=>{
        fs.readdir(dirpath, (err, files)=>{
            if(files){
                const images = files.filter(img =>{
                    let extension = path.extname(img).toLowerCase()
                    return extension === '.png'
                    || extension === '.jpg'
                    || extension === '.jpeg'
                })
                setScreenshots(images)
            }
        })
        
    }, [])

    function playFocusSound() {
        audios.focusAudio.currentTime = 0
        audios.focusAudio.play()
    }
    
    function handleSearch(value) {
        setSearchValue(value)
        fs.readdir(dirpath, (err, files)=>{
            if(files){
                const images = files.filter(img =>{
                    let extension = path.extname(img).toLowerCase()  
                    return extension === '.png'
                        || extension === '.jpg'
                        || extension === '.jpeg'
                })
                const searchedImages = images.filter(img =>{
                    return img.toLowerCase().includes(value.toLowerCase())
                })
                setScreenshots(searchedImages)
            }
        })
    }

    return(
        <Guide>
            <div className="content">
                <h1><PhotoCollectionIcon/> <span>Minhas capturas</span> </h1>
                <div className="main-items">
                    <Link tabIndex="-1" to="/gallery"><Item text="Voltar" image={<BackIcon/>} autoFocus/></Link>
                </div>
                <hr />
                <div className="main-items">
                    <InputText 
                        value={searchValue} 
                        icon={<SearchIcon/>} 
                        placeholder="Procurar"
                        onChange={e => handleSearch(e.target.value)}
                    />
                </div>
                
                {screenshots.length > 0 && 
                    <div className="screenshots-container grid">
                        {
                            screenshots.map(image =>{
                                return(
                                <div 
                                    key={image} 
                                    className="screenshot" 
                                    tabIndex={0}
                                    onFocus={()=>playFocusSound()}
                                >
                                    <img src={dirpath + image}/>
                                    <div className="name"><span>{image}</span></div>
                                </div>
    
                                )
                            })
                        }
                    </div> 
                }

                {
                    searchValue != "" && screenshots.length == 0
                    && <h1>Nenhum resultado encontrado</h1>
                }
                
                {
                    searchValue == "" && screenshots.length == 0
                    && <h1>Ooops! Você não possui capturas</h1>
                }
            </div>
        </Guide>
    )
}