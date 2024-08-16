import React from "react";
import ArrayBar from "./ArrayBar";
import { useEffect, useState } from "react";
import "./SortingVisualizer.css";

function SortingVisualizer() {
  const [isSorting, setIsSorting] = useState(false);
  const [array, setArray] = useState([]);
  const [activeIndex, setActiveIndex] = useState();
  const [sortedIndices, setSortedIndices] = useState([]);
  const [sliderValue, setSliderValue] = useState(10);
  const [speed, setSpeed] = useState("Slow");
  const [min, setMin] = useState();
  const [selectedSort, setSelectedSort] = useState("Bubble");

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

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
    setMin();
  };

  const bubbleSort = async () => {
    setIsSorting(true);
    const arr = [...array];
    const updatedIndices = [...sortedIndices];
    const delay = speed === "Slow" ? 800 : speed === "Medium" ? 300 : 100;

    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < array.length - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          setActiveIndex(j + 1);
          var temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          setArray([...array]);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }

      updatedIndices.push(arr.length - i - 1);
      setSortedIndices([...updatedIndices]);
    }
    setActiveIndex();
    let arr2 = [];
    for (let i = 0; i < array.length; i++) {
      arr2.push(i);
      setSortedIndices([...arr2]);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    setIsSorting(false);
  };

  const insertionSort = async () => {
    setIsSorting(true);
    // setting the first index to sorted
    const updatedIndices = [...sortedIndices];
    updatedIndices.push(0);
    setSortedIndices([...updatedIndices]);

    for (let i = 1; i < array.length; i++) {
      // starting from index 1

      let current = array[i];
      let j = i - 1;
      const delay = speed === "Slow" ? 800 : speed === "Medium" ? 300 : 100;

      setActiveIndex(i);
      await new Promise((resolve) => setTimeout(resolve, delay));

      while (j >= 0 && array[j] > current) {
        setActiveIndex(j);
        array[j + 1] = array[j];
        updatedIndices.push(i);
        setSortedIndices([...updatedIndices]);
        array[j] = current;
        setArray([...array]);
        await new Promise((resolve) => setTimeout(resolve, delay));
        j--;
      }
      updatedIndices.push(i);
      setSortedIndices([...updatedIndices]);
      setArray([...array]);
    }
    setActiveIndex();
    let arr = [];
    for (let i = 0; i < array.length; i++) {
      arr.push(i);
      setSortedIndices([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    setIsSorting(false);
  };

  const selectionSort = async () => {
    setIsSorting(true);
    const updatedIndices = [...sortedIndices];
    const delay = speed === "Slow" ? 800 : speed === "Medium" ? 300 : 100;
    for (let i = 0; i < array.length; i++) {
      let minIndex = i;
      setMin(minIndex);
      await new Promise((resolve) => setTimeout(resolve, delay));
      for (let j = i + 1; j < array.length; j++) {
        setActiveIndex(j);
        await new Promise((resolve) => setTimeout(resolve, delay));
        if (array[j] < array[minIndex]) {
          minIndex = j;
          setMin(minIndex);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
      var temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;

      updatedIndices.push(i);
      setSortedIndices([...updatedIndices]);
      setArray([...array]);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
    let arr = [];
    setActiveIndex();
    for (let i = 0; i < array.length; i++) {
      arr.push(i);
      setSortedIndices([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    setIsSorting(false);
  };

  return (
    <>
      <div className="button-container">
        <button onClick={generateRandomArray} disabled={isSorting}>
          Generate Array
        </button>
        <div className="sort-dropdown-container">
          <label htmlFor="sortSelector">Select Sort: </label>
          <select
            id="sortSelector"
            name="sortSelector"
            value={selectedSort}
            onChange={handleSortChange}
            disabled={isSorting}
          >
            <option value="Bubble">Bubble Sort</option>
            <option value="Insertion">Insertion Sort</option>
            <option value="Selection">Selection Sort</option>
          </select>
        </div>
        <div>
          <label htmlFor="speedSelector">Speed: </label>
          <select
            id="speedSelector"
            name="speedSelector"
            value={speed}
            onChange={handleSpeedChange}
            disabled={isSorting}
          >
            <option value="Slow">Slow</option>
            <option value="Medium">Medium</option>
            <option value="Fast">Fast</option>
          </select>
        </div>
      </div>
      <div className="array-container">
        {array.map((value, idx) => (
          <ArrayBar
            key={idx}
            height={value}
            color={
              idx === activeIndex
                ? 2
                : sortedIndices.includes(idx)
                ? 1
                : idx === min
                ? 3
                : 0
            }
          />
        ))}
      </div>
      <button
        className={`${selectedSort !== "Bubble" ? "hidden" : ""}`}
        onClick={bubbleSort}
        disabled={isSorting}
      >
        Sort
      </button>
      <button
        className={`${selectedSort !== "Insertion" ? "hidden" : ""}`}
        onClick={insertionSort}
        disabled={isSorting}
      >
        Sort
      </button>
      <button
        className={`${selectedSort !== "Selection" ? "hidden" : ""}`}
        onClick={selectionSort}
        disabled={isSorting}
      >
        Sort
      </button>
      <div className="customize-container">
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
            disabled={isSorting}
          />
          <span>{sliderValue}</span>
        </div>
      </div>
    </>
  );
}

export default SortingVisualizer;
