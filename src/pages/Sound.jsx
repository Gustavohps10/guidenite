import Guide from "../components/Guide"
import Item from "../components/Item"
import ItemVolume from "../components/ItemVolume"
import {Link} from "react-router-dom"
import { NodeAudioVolumeMixer } from "node-audio-volume-mixer"
import windowsIcon from "../assets/images/windows-icon.png"
import softwareIcon from "../assets/images/software-icon.png"
import '../styles/sound.scss'
import {BackIcon, Volume3Icon} from "@fluentui/react-icons-mdl2"
import {useState, useEffect, useRef} from "react"

export default function Sound(){
    const [sessions, setSessions] = useState(getSessions())
    const [volumes, setVolumes] = useState(getVolumes())

    useEffect(() => {
        const interval = setInterval(() => {
            setSessions(getSessions())
            setVolumes(getVolumes())
        }, 400);
        return () => {
            clearInterval(interval);
        };
       
    }, []); 

    function getSessions(){
        let sessions = NodeAudioVolumeMixer.getAudioSessionProcesses()
        let filteredSessions = []
        sessions.map(session => {
            let repeated = filteredSessions.find(obj => {
                return obj.pid == session.pid
            })
            
            if(session.pid == 0 || repeated != undefined){
                return
            }
            filteredSessions.push({
                pid: session.pid,
                name: session.name || 'Desconhecido'
            })
        })

        return filteredSessions
    }

    function getVolumes() {
        let volumes = {
            "main": Math.round(NodeAudioVolumeMixer.getMasterVolumeLevelScalar() * 100)
        }
        getSessions().map((session) =>{
            volumes[session.pid] = Math.round(NodeAudioVolumeMixer.getAudioSessionVolumeLevelScalar(session.pid) * 100)
        })
        return volumes
    }
    
    function handleVolume(pid, volume){

        let newVolumes = getVolumes()
        newVolumes[pid] = parseInt(volume)
        setVolumes(newVolumes)

        if(pid == "main"){
            NodeAudioVolumeMixer.setMasterVolumeLevelScalar(volume / 100);
            return
        }
        NodeAudioVolumeMixer.setAudioSessionVolumeLevelScalar(pid, volume / 100);
    }

    return (
        <Guide>
            {<div className="content">
                <h1><Volume3Icon/> <span>Controle de Som</span> </h1>
                <div className="main-items">
                    <Link tabIndex="-1" to="/"><Item text="Voltar" image={<BackIcon/>}/></Link>
                </div>
                <hr />
                <h1>Mixer</h1>
   
                <div className="sounds">
                    <ItemVolume text="Principal" image={windowsIcon}
                        volume={volumes.main} 
                        onChange={e => handleVolume("main", e.target.value)}
                    />

                    {sessions.map((session)=>{ 
                        return (
                            session.pid != "main" &&
                            <ItemVolume
                                key={session.pid}
                                text={session.name} 
                                image={softwareIcon}
                                volume={volumes[session.pid]} 
                                onChange={e => handleVolume(session.pid, e.target.value)}
                            />
                        )
                    })}
                </div>
            </div>} 
                </Guide>
    )
}