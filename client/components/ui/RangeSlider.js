import React, { useCallback, useEffect, useState, useRef } from "react";

const MultiRangeSlider = ({ min, max=50000, onChange }) => {
    const [minVal, setMinVal] = useState(min);
    const [maxVal, setMaxVal] = useState(max);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);

    // Convert to percentage
    const getPercent = useCallback(
        (value) => Math.round(((value - min) / (max - min)) * 100),
        [min, max]
    );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(maxValRef.current);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [minVal, getPercent]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(minValRef.current);
        const maxPercent = getPercent(maxVal);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [maxVal, getPercent]);

    // Get min and max values when their state changes
    useEffect(() => {
        //onChange({ min: minVal, max: maxVal });
        //console.log("minVal, maxVal:", minVal, maxVal);
        console.log("min:", minVal, " max:", maxVal);
    }, [minVal, maxVal, onChange]);

    return (
        <div className="relative w-full h-8 flex items-center">
            <input
                type="range"
                min={min}
                max={max}
                value={minVal}
                onChange={(event) => {
                    const value = Math.min(Number(event.target.value), maxVal);
                    setMinVal(value);
                    minValRef.current = value;
                }}
                className="thumb z-[3] pointer-events-none absolute top-0 bottom-0 my-auto h-0 w-full"
                style={{ zIndex: minVal > max - 100 && "5" }}
            />
            <input
                type="range"
                min={min}
                max={max}
                value={maxVal}
                onChange={(event) => {
                    const value = Math.max(Number(event.target.value), minVal);
                    setMaxVal(value);
                    maxValRef.current = value;
                }}
                className="thumb z-[4] pointer-events-none absolute top-0 bottom-0 my-auto h-0 w-full"
            />

            <div className="relative w-full">
                <div className="absolute rounded h-2 bg-zinc-300 w-full z-[1] top-0 bottom-0 my-auto" />
                <div
                    ref={range}
                    className="absolute rounded bg-zinc-700 h-2 z-[2] top-0 bottom-0 my-auto"
                />
            </div>
        </div>
    );
};

export default MultiRangeSlider;
