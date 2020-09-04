import React from 'react';
import './App.css';
import Buttons from './Buttons'

export default function Question(props) {
    return (
        <div id={props.num+1} className='stack'>
            <header className = 'q-header'>
                Question {props.num+1}
            </header>
            <div className = 'question'>
                <div className='tweet'>
                {props.tweet}
                </div>
                <Buttons upd = {props.upd} num = {props.num} inc = {props.inc} options = {props.options} ans = {props.answer} submitted = {props.submitted} correct = {props.correct}></Buttons>
            </div>
        </div>
    )
}