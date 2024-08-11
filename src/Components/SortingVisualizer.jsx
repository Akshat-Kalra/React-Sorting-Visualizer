import React from "react";
import ArrayBar from "./ArrayBar";
import {useEffect, useState } from "react";
import './SortingVisualizer.css'


function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [activeIndex, setActiveIndex] = useState();
  const [sortedIndices, setSortedIndices] = useState([]);
  const [sliderValue, setSliderValue] = useState(10);
  const [speed, setSpeed] = useState('Medium');


  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
  };

  useEffect(() => {
    generateRandomArray();
  }, [sliderValue]);

  const generateRandomArray = () => {
    const arr = [];
    for (let i = 0; i < sliderValue; i++) {
      arr.push(Math.floor(Math.random() * 500) + 5);
    }
    setArray(arr);
    setActiveIndex([]);
    setSortedIndices([]);
  };

  const resetState = () => {
    setActiveIndex([]);
    setSortedIndices([]);
  };

  const bubbleSort = async () => {
    const arr = [...array];
    const updatedIndices = [...sortedIndices];
    const delay = speed === 'Slow' ? 800 : speed === 'Medium' ? 300 : 100;

    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < (array.length - i - 1); j++) {
            if(array[j] > array[j+1]) {
                setActiveIndex(j+1);
                var temp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = temp
                setArray([... array])
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }

        updatedIndices.push(arr.length - i - 1);
        setSortedIndices([...updatedIndices]);

    }
    setActiveIndex();
  }

  const insertionSort =  async () => {

    // setting the first index to sorted
    const updatedIndices = [...sortedIndices];
    updatedIndices.push(0);
    setSortedIndices([...updatedIndices]);

    for (let i = 1; i < array.length; i++) {
        // starting from index 1

        let current = array[i];
        let j = i - 1;
        const delay = speed === 'Slow' ? 800 : speed === 'Medium' ? 300 : 100;

        setActiveIndex(i);
        await new Promise(resolve => setTimeout(resolve, delay));

        while (j >= 0 && array[j] > current) {
            setActiveIndex(j);
            array[j+1] = array[j];
            array[j] = current;
            setArray([... array]);
            await new Promise(resolve => setTimeout(resolve, delay));
            j--;
        }
        // array[j + 1] = current;
        setArray([... array]);

        updatedIndices.push(i);
        setSortedIndices([...updatedIndices]);
        await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  return (
    <>
        <button onClick={bubbleSort}>Bubble Sort</button>
        <button onClick={insertionSort}>Insertion Sort</button>
        <button onClick={generateRandomArray}>Generate Array</button>
        <div className="array-container">
        {array.map((value, idx) => (
            <ArrayBar key={idx} height={value} color = {idx === activeIndex ? 2 :
                sortedIndices.includes(idx) ? 1 : 0
            }/>
        ))}
        </div>
        <div>
        <label htmlFor="arraySizeSlider">Array Size: </label>
        <input
            type="range"
            id="arraySizeSlider"
            name="arraySizeSlider"
            min="10"
            max="30"
            value={sliderValue}
            onChange={handleSliderChange}
        />
        <span>{sliderValue}</span>
        
            <label htmlFor="speedSelector">Select Speed: </label>
            <select
                id="speedSelector"
                name="speedSelector"
                value={speed}
                onChange={handleSpeedChange}
            >
                <option value="Slow">Slow</option>
                <option value="Medium">Medium</option>
                <option value="Fast">Fast</option>
            </select>
            <span>Selected Speed: {speed}</span>
    </div>
    </>
  );
}

export default SortingVisualizer;
