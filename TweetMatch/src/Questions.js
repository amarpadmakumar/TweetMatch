import React from 'react';
import './App.css';
import Button from './Button'
import Buttons from './Buttons'

export default class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions = props.questions
        }
    }
}