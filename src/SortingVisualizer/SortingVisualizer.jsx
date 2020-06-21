import React, { Component } from 'react'
import './SortingVisualizer.css'
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';



const ANIMATION_SPEED_MS = 1;

const PRIMARY_COLOR = 'turquoise';

const SECONDARY_COLOR = 'red';
export class SortingVisualizer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        console.log("hi");
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for(let i = 0;i<300;i++){
            array.push(randomIntFromInterval(5,600));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * ANIMATION_SPEED_MS);
          }
        }
      }
    render() {
        const array = this.state.array;
        return (
            <div>
                <div className="array-container">
                    <br></br>
                    {array.map((value, idx) => (
                    <div 
                    className="array-bar" 
                    key={idx}
                    style={{height: `${value}px`}}></div>
                
                    ))}
           
                </div>
                <br></br>
                <div>            
                    <button className="GenerateButton" onClick={() => this.resetArray()}>Generate New array</button>
                    <button className="MergeSort" onClick={() => this.mergeSort()}>Merge Sort</button>
                </div>
            </div>
        );

    }
}
function randomIntFromInterval(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// function arrayAreEqual(arrayOne, arrayTwo) {
//     if(arrayOne.length !== arrayTwo.length) return false;
//     for(let i = 0;i < arrayOne.length; i++){
//         if(arrayOne[i] !== arrayTwo[i]) return false;
//     }
//     return true;
// }
export default SortingVisualizer
