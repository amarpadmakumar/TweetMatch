import React from 'react';
import './App.css';

export default function Button(props) {
    if (!props.submitted) {
        return (
            <button className={props.selected ? 'option-selected' : 'option'} onClick = {() => props.click()}>@{props.text}</button>
        )
    }
    else {
        if (props.selected && props.correct) {
            return (
                <button className = 'option-correct'>@{props.text}</button>
            )
        } 
        else if (props.selected && !props.correct) {
            return (
                <button className = 'option-wrong'>@{props.text}</button>
            )
        }
        else {
            return (
                <button className = 'option'>@{props.text}</button>
            )
        }

    }
}