import React from 'react';
import './App.css';
import Button from './Button'

export default class Buttons extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: [false,false,false,false],
            options: props.options,
            ans: props.ans,
            correct: props.correct,
            submitted: props.submitted
        }
    }
    
    click(num) {
        let sel = [...this.state.selected]
        for (let i = 0; i < sel.length; i++) {
            sel[i] = i===num ? !sel[i] : false; 
          }
        this.setState({selected: sel});
        console.log(sel, num)
        if (sel[num]) {
            this.props.upd(this.props.num, num)
        }
        else {
            this.props.upd(this.props.num, null)
        }
    }

    shouldComponentUpdate() {
        return !this.props.submitted
    }

    findAns() {
        for (let i = 0; i < this.state.options.length; i++) {
            if (this.state.selected[i] && this.state.correct[i]) {
                return <p className = 'display-correct'>CORRECT</p>
            }
            else if (this.state.selected[i] && !this.state.correct[i]) {
                return <p className = 'display-wrong'>INCORRECT</p>
            }
        }
        return <p className = 'display-wrong'>YOU DID NOT SUBMIT AN ANSWER</p>
    }

    render() {
        if (!this.props.submitted) {
            return (
                <div className = 'options'>
                    <Button text= {this.state.options[0]} selected = {this.state.selected[0]} click = {() => this.click(0)} submitted = {this.props.submitted}></Button>
                    <Button text= {this.state.options[1]} selected = {this.state.selected[1]} click = {() => this.click(1)} submitted = {this.props.submitted}></Button>
                    <Button text= {this.state.options[2]} selected = {this.state.selected[2]} click = {() => this.click(2)} submitted = {this.props.submitted}></Button>
                    <Button text= {this.state.options[3]} selected = {this.state.selected[3]} click = {() => this.click(3)} submitted = {this.props.submitted}></Button>
                </div>
            )
        }
        else {
            return (
                <div>
                    <div className = 'options'>
                        <Button text= {this.state.options[0]} selected = {this.state.selected[0]} correct = {this.props.correct[0]} submitted = {this.props.submitted}></Button>
                        <Button text= {this.state.options[1]} selected = {this.state.selected[1]} correct = {this.props.correct[1]} submitted = {this.props.submitted}></Button>
                        <Button text= {this.state.options[2]} selected = {this.state.selected[2]} correct = {this.props.correct[2]} submitted = {this.props.submitted}></Button>
                        <Button text= {this.state.options[3]} selected = {this.state.selected[3]} correct = {this.props.correct[3]} submitted = {this.props.submitted}></Button>
                    </div>
                    <div>{this.findAns()}</div>
                </div>
            )
        }
    }

}

