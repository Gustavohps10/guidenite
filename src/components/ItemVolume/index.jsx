import { memo } from "react"
import Item from "../Item";
import Slider from '@mui/material/Slider';

function ItemVolume(props) {
    return (
        <Item text={props.text} image={props.image}>
            <div className="slider-box">
                <Slider
                    tabIndex={-1}
                    value={props.volume} 
                    onChange={props.onChange}
                    min={0}
                    max={100}
                    step={10}
                />
                <label className="main-value">{props.volume}</label>
            </div>
        </Item>
    )
}


export default memo(ItemVolume, (prev, next)=>{
    return prev.volume == next.volume
})