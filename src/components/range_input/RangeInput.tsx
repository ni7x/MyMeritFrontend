import React, { useState, ChangeEvent } from 'react';

interface RangeInputProps {
    label: string;
    min: number;
    max: number;
    minValue: number;
    maxValue: number;
    onInputChange: (values: { minValue: number; maxValue: number }) => void;
    currency?: string;
}

const RangeInput: React.FC<RangeInputProps> = ({ label, min, max, minValue: initialMinValue, maxValue: initialMaxValue, onInputChange, currency }) => {
    const [minValue, setMinValue] = useState<number>(initialMinValue);
    const [maxValue, setMaxValue] = useState<number>(initialMaxValue);

    const handleMinValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.currentTarget.value);
        setMinValue(value);
        onInputChange({ minValue: value, maxValue });

    };

    const handleMaxValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.currentTarget.value);
        setMaxValue(value);
        onInputChange({ minValue, maxValue: value });
    };

    return (
        <div>
            <label className="pb-5 lg:pb-0 text-sm font-medium">{label}</label>
            <div className="flex justify-between mt-1">
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

export default RangeInput;
