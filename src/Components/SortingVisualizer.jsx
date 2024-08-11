import React from "react";
import ArrayBar from "./ArrayBar";
import {useEffect, useState } from "react";
import './SortingVisualizer.css'


function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [activeIndex, setActiveIndex] = useState();
  const [sortedIndices, setSortedIndices] = useState([]);
  useEffect(() => {
    generateRandomArray();
  }, []);

  const generateRandomArray = () => {
    const arr = [];
    for (let i = 0; i < 10; i++) {
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

    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < (array.length - i - 1); j++) {
            if(array[j] > array[j+1]) {
                setActiveIndex(j);
                var temp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = temp
                setArray([... array])
                await new Promise(resolve => setTimeout(resolve, 50));
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

        setActiveIndex(i);
        await new Promise(resolve => setTimeout(resolve, 100));

        while (j >= 0 && array[j] > current) {
            setActiveIndex(j);
            array[j+1] = array[j];
            array[j] = current;
            setArray([... array]);
            await new Promise(resolve => setTimeout(resolve, 100));
            j--;
        }
        // array[j + 1] = current;
        setArray([... array]);

        updatedIndices.push(i);
        setSortedIndices([...updatedIndices]);
        await new Promise(resolve => setTimeout(resolve, 100));
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
    </>
  );
}

export default SortingVisualizer;
