import React, {useEffect, useState} from "react";
import {spawn} from "node:child_process"
import iconv from "iconv-lite"
import fileIcon from "extract-file-icon"

export const WindowContext = React.createContext([])

export const WindowProvider = (props) => {
    const [openWindows, setOpenWindows] = useState([])

    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    useEffect(()=>{
        let command = 'chcp 65001; for(;;){Get-Process | Where-Object {$_.MainWindowTitle} | Select-Object Id, MainWindowTitle, Path |  ConvertTo-Json; Start-Sleep -Seconds 1}'
        let child = spawn("powershell.exe",[command]);

        child.stdout.on("data",function(stdout){
            if(isJson(stdout)){
                let windows = []
                let decoded = iconv.decode(stdout, 'utf8')
                let windowsJson = JSON.parse(decoded)
                
                windowsJson.forEach(win =>{
                    let icon = win.Path 
                        ? "data:image/png;base64," + fileIcon(win.Path, 32).toString('base64') 
                        : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEaSURBVFhH7ZTbCoJAEIaFCCKCCKJnLTpQVBdB14HQ00T0CqUP4AN41puJAVe92F3HRZegHfgQFvH7/1nQMmPmZ+Z8uYJOCm01vJe64PF8cZ+Ftho89DxPC8IAeZ73QpZlJWmattsAfsBavsk0yRsD3Ox7ST3A4uTC/OjC7ODCdO/AZOfAeOvAaPOB4foDg1UVwLZtIUmSqG2AIq9vgNcc5coBKHIWgNec0RhAdAUUOSJrjsRxrLYBihxBMa85QzkARY7ImjOkAURXQJEjKOY1Z0RRpLYBihyRNUe5cgCKHEEprzmjMYDoCqjImiNhGKptgApvA3V57wFkzbUGEMmDIGgfAKH84ShypQBdyn3fFwfQSaE1Y+bvx7K+efsbU5+Ow3MAAAAASUVORK5CYII="
                    windows.push({
                        id: win.Id,
                        title: win.MainWindowTitle,
                        path: win.Path,
                        icon: icon
                    })
                })
        
                setOpenWindows(windows)
            }
        });
        child.stderr.on("data",function(data){
            console.log("Powershell Errors: " + data);
        });

        window.onbeforeunload = function() {
            child.kill()
        }
    },[])
    
    return(
        <WindowContext.Provider value={openWindows}>
            {props.children}
        </WindowContext.Provider>
    )
}