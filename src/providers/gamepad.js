import { useGamepads } from 'react-gamepads';
import React, { useEffect, useState } from "react";
import {useNavigate, useLocation} from "react-router-dom"

export const GamepadContext = React.createContext({})

export const GamepadProvider = (props) => {
    const navigate = useNavigate()
    const location = useLocation()

    const [gamepads, setGamepads] = useState({})
    //LEFTAXES
    const [leftAxisUpLastTimestamp, setLeftAxisUpLastTimestamp] = useState(0) // Up
    const [leftAxisDownLastTimestamp, setLeftAxisDownLastTimestamp] = useState(0) // Down
    const [leftAxisLeftLastTimestamp, setLeftAxisLeftLastTimestamp] = useState(0) // Left
    const [leftAxisRightLastTimestamp, setLeftAxisRightLastTimestamp] = useState(0) // Right

    //BUTTONS
    const [buttonALastValue, setButtonALastValue] = useState(0)
    const [buttonBLastValue, setButtonBLastValue] = useState(0)
    
    const focusableElements = Array.prototype.filter.call(document.querySelectorAll("[tabIndex='0']"), function (element) {
        return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
    });

    useGamepads(controllers => setGamepads(controllers))

    function focusNextElement(elements, indexOf = document.activeElement) {

        if(indexOf.tabIndex == -1){
            indexOf = indexOf.closest('[tabindex="0"]')
        }

        let index = elements.indexOf(indexOf)
    
        if(index == elements.length - 1){
            elements[0].focus()
            return
        }

        if(elements[index + 1]){
            elements[index + 1].focus()
        }else{
            elements[0].focus()
        }
       
    }

    function focusPreviousElement(elements, indexOf = document.activeElement) {
        if(indexOf.tabIndex == -1){
            indexOf = indexOf.closest('[tabindex="0"]')
        }

        let index = elements.indexOf(indexOf)

        if(index == 0){
            elements[elements.length - 1].focus()
            return
        }

        if(elements[index - 1]){
            elements[index - 1].focus()
        }else{
            elements[0].focus()
        }
      
    }

    useEffect(()=>{
        if(gamepads[0]){

            //LEFTAXES - DOWN
            if(gamepads[0].axes[1] > 0.5){
                if(leftAxisUpLastTimestamp == 0 || Date.now() >= leftAxisUpLastTimestamp + 200){
                    setLeftAxisUpLastTimestamp(Date.now())
                    if(document.activeElement.closest('.horizontal')){
                        let horizontalFocusableElements = Array.prototype.filter.call(document.activeElement.closest('.horizontal').querySelectorAll("[tabIndex='0']"), function (element) {
                            return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
                        });
                     
                        focusNextElement(focusableElements, horizontalFocusableElements[horizontalFocusableElements.length - 1])
    
                        return
                    }

                    if(document.activeElement.closest('.grid')){
                        let grid = document.activeElement.closest('.grid')
                        let gridFocusableElements = Array.prototype.filter.call(grid.querySelectorAll("[tabIndex='0']"), function (element) {
                            return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
                        });
                       
                        let gridWidth = grid.offsetWidth
                        let itemWidth = document.activeElement.offsetWidth + 10
                        let columns = Math.trunc(gridWidth / itemWidth)
                        //let rows = Math.ceil(gridFocusableElements.length / columns)
                        let index = gridFocusableElements.indexOf(document.activeElement)
                        
                        let currentColumn = (index + 1) % columns

                        if((index + 1) % columns == 0){
                            currentColumn = columns
                        }
                        
                        let currentColumnElements = gridFocusableElements.filter(element =>{
                            let elementIndex = gridFocusableElements.indexOf(element)
                            let elementColumn =  (elementIndex + 1) % columns

                            if((elementIndex + 1) % columns == 0){
                                elementColumn = columns
                            }
                            return elementColumn == currentColumn
                        })

                        let columnIndex = currentColumnElements.indexOf(document.activeElement)
                        if(columnIndex != currentColumnElements.length - 1){
                            currentColumnElements[columnIndex + 1].focus()
                        }
                        
                        return
                    }
                    focusNextElement(focusableElements)
                }
            }
    
            //LEFTAXES - UP
            if(gamepads[0].axes[1] < -0.5){
                if(leftAxisDownLastTimestamp == 0 || Date.now() >= leftAxisDownLastTimestamp + 200){
                    setLeftAxisDownLastTimestamp(Date.now())
                    if(document.activeElement.closest('.horizontal')){
                        let horizontalFocusableElements = Array.prototype.filter.call(document.activeElement.closest('.horizontal').querySelectorAll("[tabIndex='0']"), function (element) {
                            return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
                        });
                        
                        focusPreviousElement(focusableElements, horizontalFocusableElements[0])
                        return
                    }

                    if(document.activeElement.closest('.grid')){
                        let grid = document.activeElement.closest('.grid')
                        let gridFocusableElements = Array.prototype.filter.call(grid.querySelectorAll("[tabIndex='0']"), function (element) {
                            return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
                        });
                       
                        let gridWidth = grid.offsetWidth
                        let itemWidth = document.activeElement.offsetWidth + 10
                        let columns = Math.trunc(gridWidth / itemWidth)
                        //let rows = Math.ceil(gridFocusableElements.length / columns)
                        let index = gridFocusableElements.indexOf(document.activeElement)
                        
                        let currentColumn = (index + 1) % columns

                        if((index + 1) % columns == 0){
                            currentColumn = columns
                        }
                        
                        let currentColumnElements = gridFocusableElements.filter(element =>{
                            let elementIndex = gridFocusableElements.indexOf(element)
                            let elementColumn =  (elementIndex + 1) % columns

                            if((elementIndex + 1) % columns == 0){
                                elementColumn = columns
                            }
                            return elementColumn == currentColumn
                        })

                        let columnIndex = currentColumnElements.indexOf(document.activeElement)

                        if(columnIndex != 0){
                            currentColumnElements[columnIndex - 1].focus()
                        }else{
                            focusableElements[focusableElements.indexOf(gridFocusableElements[0]) - 1].focus()
                        }
                        
                        return
                    }
                    focusPreviousElement(focusableElements)
                }
            }
    
            //LEFTAXES - RIGHT
            if(gamepads[0].axes[0] > 0.5){
                if(leftAxisRightLastTimestamp == 0 || Date.now() >= leftAxisRightLastTimestamp + 200){
                    setLeftAxisRightLastTimestamp(Date.now())
                    if(document.activeElement.closest('.horizontal')){
                        let horizontalFocusableElements = Array.prototype.filter.call(document.activeElement.closest('.horizontal').querySelectorAll("[tabIndex='0']"), function (element) {
                            return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
                        });
    
                        focusNextElement(horizontalFocusableElements)
    
                    }
                    
                    if(document.activeElement.closest('.grid')){
                        let grid = document.activeElement.closest('.grid')
                        let gridFocusableElements = Array.prototype.filter.call(grid.querySelectorAll("[tabIndex='0']"), function (element) {
                            return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
                        });
                       
                        let gridWidth = grid.offsetWidth
                        let itemWidth = document.activeElement.offsetWidth + 10
                        let columns = Math.trunc(gridWidth / itemWidth)
                        //let rows = Math.ceil(gridFocusableElements.length / columns)
                        let index = gridFocusableElements.indexOf(document.activeElement)
                        let currentLine = Math.ceil((index + 1) / columns)
                        let currentLineElements = gridFocusableElements.filter(element =>{
                            let elementLine = Math.ceil((gridFocusableElements.indexOf(element) + 1) / columns)
                            return elementLine == currentLine
                        })

                        let lineIndex = currentLineElements.indexOf(document.activeElement)

                        if(lineIndex != currentLineElements.length - 1){
                            gridFocusableElements[index + 1].focus()
                        }
                    }
                }   
            }
    
            //LEFTAXES - LEFT
            if(gamepads[0].axes[0] < -0.5){
                if(leftAxisLeftLastTimestamp == 0 || Date.now() >= leftAxisLeftLastTimestamp + 200){
                    setLeftAxisLeftLastTimestamp(Date.now())
                    if(document.activeElement.closest('.horizontal')){
                        let horizontalFocusableElements = Array.prototype.filter.call(document.activeElement.closest('.horizontal').querySelectorAll("[tabIndex='0']"), function (element) {
                            return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
                        });
    
                        focusPreviousElement(horizontalFocusableElements)
    
                    }

                    if(document.activeElement.closest('.grid')){
                        let grid = document.activeElement.closest('.grid')
                        let gridFocusableElements = Array.prototype.filter.call(grid.querySelectorAll("[tabIndex='0']"), function (element) {
                            return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
                        });
                       
                        let gridWidth = grid.offsetWidth
                        let itemWidth = document.activeElement.offsetWidth + 10
                        let columns = Math.trunc(gridWidth / itemWidth)
                        let index = gridFocusableElements.indexOf(document.activeElement)
                        let currentLine = Math.ceil((index + 1) / columns)
                        let currentLineElements = gridFocusableElements.filter(element =>{
                            let elementLine = Math.ceil((gridFocusableElements.indexOf(element) + 1) / columns)
                            return elementLine == currentLine
                        })

                        let lineIndex = currentLineElements.indexOf(document.activeElement)

                        if(lineIndex != 0){
                            gridFocusableElements[index - 1].focus()
                        }
                    }
                }    
            }
    
            //BUTTON A PRESSED
            if(gamepads[0].buttons[0].value == 1 && buttonALastValue == 0){
                setButtonALastValue(1)
                document.activeElement.classList.add('pressed')
            }

            //BUTTON A RELEASED
            if(gamepads[0].buttons[0].value == 0 && buttonALastValue == 1){
                setButtonALastValue(0)
                document.querySelector('.pressed').classList.remove('pressed')
                document.activeElement.click()
            }
    
            //BUTTON B PRESSED
            if(gamepads[0].buttons[1].value == 1 && buttonBLastValue == 0){
                setButtonBLastValue(1)
                console.log("B");
            }
            //BUTTON B RELEASED
            if(gamepads[0].buttons[1].value == 0 && buttonBLastValue == 1){
                setButtonBLastValue(0)
                if(location.pathname != "/"){
                    navigate(-1)
                }
            }
        }

    }, [gamepads])
    
    return(
        <GamepadContext.Provider value={gamepads}>
            {props.children}
        </GamepadContext.Provider>
    )
}