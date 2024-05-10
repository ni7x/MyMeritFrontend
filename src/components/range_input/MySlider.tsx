import MultiRangeSlider from "multi-range-slider-react";
import "./slider.css";
// import { useState } from "react";

const MySlider = ({ min, max, onInputChange, minValue, maxValue }) => {

    if(minValue > maxValue){
        const temp = maxValue;
        maxValue = minValue;
        minValue = temp;
    }

    return (
        <MultiRangeSlider
            ruler={false}
            min={min}
            max={max}
            maxValue={maxValue}
            minValue={minValue}
            baseClassName="my-slider"
            label={false}
            step={5}
            className="w-full py-4"
            onInput={onInputChange}
        />
    );
};

export default MySlider;
