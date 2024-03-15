import React, { useState } from 'react';
import MySlider from './MySlider';

const InputWithSlider = ({ label, min, max, minValue: initialMinValue, maxValue: initialMaxValue, onInputChange, currency }) => {
    const [minValue, setMinValue] = useState(initialMinValue);
    const [maxValue, setMaxValue] = useState(initialMaxValue);

    const handleMinValueChange = (e) => {
        const value = parseFloat(e.currentTarget.value);
        setMinValue(value);

    };

    const handleMaxValueChange = (e) => {
        const value = parseFloat(e.currentTarget.value);
        setMaxValue(value);
    };

    const handleSliderChange = (e) => {
        setMinValue(e.minValue);
        setMaxValue(e.maxValue);
        onInputChange(e);
    };

    return (
        <div>
            <label className="pb-5 lg:pb-0 text-sm font-medium">{label}</label>
            <div className="flex items-center w-full">
                <MySlider
                    min={min}
                    max={max}
                    minValue={minValue}
                    maxValue={maxValue}
                    onInputChange={handleSliderChange}
                    step={5}
                />
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col w-[45%]">
                    <p className="text-xs text-main-lighter font-medium">Min {currency && "(" + currency + ")"}</p>
                    <input
                        type="number"
                        value={minValue}
                        onChange={handleMinValueChange}
                        min={min}
                        max={max}
                        step={5}
                        className="outline-none mt-1 p-2 px-3 w-[100%] rounded bg-main-lighter-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>

                <div className="flex flex-col w-[45%]">
                    <p className="text-xs text-main-lighter font-medium">Max {currency && "(" + currency + ")"}</p>
                    <input
                        type="number"
                        value={maxValue}
                        onChange={handleMaxValueChange}
                        min={min}
                        max={max}
                        step={5}
                        className="outline-none mt-1 p-2 px-3 w-[100%] rounded bg-main-lighter-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                </div>
            </div>
        </div>
    );
};

export default InputWithSlider;
