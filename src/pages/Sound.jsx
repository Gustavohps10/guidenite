import Guide from "../components/Guide"
import Item from "../components/Item"
import {Link} from "react-router-dom"
import { NodeAudioVolumeMixer } from "node-audio-volume-mixer"
import windowsIcon from "../assets/images/windows-icon.png"
import softwareIcon from "../assets/images/software-icon.png"
import '../styles/sound.scss'
import {BackIcon, Volume3Icon} from "@fluentui/react-icons-mdl2"
import {useState} from "react"
import Slider from '@mui/material/Slider';


export default function Sound(){
    const sessions = NodeAudioVolumeMixer.getAudioSessionProcesses();

    const processes = {main: Math.round(NodeAudioVolumeMixer.getMasterVolumeLevelScalar() * 100)}
    sessions.map(process =>{
       processes[process.pid] = Math.round(NodeAudioVolumeMixer.getAudioSessionVolumeLevelScalar(process.pid) * 100)
    });
    
    const [soundValue, setSoundValue] = useState(processes)
    
    function handleVolume(pid, volume) {
        let newSoundValues = {...soundValue}
        newSoundValues[pid] = volume
        setSoundValue(newSoundValues)
        if(pid == "main"){
            NodeAudioVolumeMixer.setMasterVolumeLevelScalar(volume / 100);
            return
        }
        NodeAudioVolumeMixer.setAudioSessionVolumeLevelScalar(pid, volume / 100);
    }

    return (
        <Guide>
            <div className="content">
                <h1><Volume3Icon/> <span>Controle de Som</span> </h1>
                <div className="main-items">
                    <Link tabIndex="-1" to="/"><Item image={<BackIcon/>} text="Voltar"/></Link>
                </div>
                <hr />
                <h1>Mixer</h1>
                <div className="sounds">
                    <Item text="Principal" image={windowsIcon}>
                        <div className="slider-box">
                            <Slider 
                                tabIndex={-1} 
                                aria-label="Volume" 
                                value={soundValue.main} 
                                onChange={e => handleVolume("main", e.target.value)} 
                                step={10}
                                min={0}
                                max={100}
                            />
                            <label className="main-value">{soundValue.main}</label>
                        </div>
                        
                    </Item>

                    {sessions.map((session)=>{ 
                        return (
                            session.pid != 0 &&
                            <Item key={session.pid} text={session.name} image={softwareIcon}>
                                <div className="slider-box">
                                    <Slider
                                        tabIndex={-1} 
                                        aria-label="Volume" 
                                        value={soundValue[session.pid]} 
                                        onChange={e => handleVolume(session.pid, e.target.value)}
                                        step={10}
                                        min={0}
                                        max={100}
                                    />
                                    <label className="main-value">{soundValue[session.pid]}</label>
                                </div>
                            </Item>
                        )
                    })}
                </div>
            </div> 
        </Guide>
    )
}