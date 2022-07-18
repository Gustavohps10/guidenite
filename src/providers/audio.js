import React from "react";

export const AudioContext = React.createContext({})

const audios = {
    focusAudio : new Audio('src/assets/sounds/focus_sound.wav')
}

export const AudioProvider = (props) => {
    return(
        <AudioContext.Provider value={{audios}}>
            {props.children}
        </AudioContext.Provider>
    )
}