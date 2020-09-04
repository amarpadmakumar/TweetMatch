import React from 'react';
import './App.css';
import Question from './Question'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'TweetMatch',
      submitted: false,
      right: 0,
      sidebar: [],
      num_questions: 10,
      selected: []
    } 
    this.updateSelected = this.updateSelected.bind(this);
    this.add_lists()
  }

  add_lists() {
    for (let i = 0; i < this.state.num_questions; i++) {
      this.state.sidebar.push(false)
      this.state.selected.push(null)
    }
  }

  updateSelected(q_num, pos) {
    let temp = [...this.state.selected]  
    temp[q_num] = pos
    this.setState({selected:temp})
  }
  componentDidMount() {
    fetch('http://127.0.0.1:5000/tweets').then(response => response.json()).then(data => this.setState({questions:data}));
  }

  submit() {
    this.setState({submitted: true})
  }

  makeSidebar() {
    let items = []
    for (let i = 1; i < this.state.num_questions+1; i++) {
      items.push(<li key= {i}><a href={`#${i}`} className = 'blackq'>Question {i}</a></li>)
    }
    return items
  }

  makeFinalSidebar(ans) {
    let items = []
    for (let i = 1; i < this.state.num_questions+1; i++) {
      if (ans[i-1]) {
        items.push(<li key= {i}><a href={`#${i}`} className = 'greenq'>Question {i}</a></li>)
      }
      else {
        items.push(<li key= {i}><a href={`#${i}`} className = 'redq'>Question {i}</a></li>)
      }
    }
    return items
  }

  display_questions(sub) {
    let x = []
    for (let i=0; i<this.state.num_questions; i++) {
      x.push(this.state.questions[i])
    }
    return x.map((question, index) => this.display_question(question, index, sub))
  }
  
  display_question(question, num,sub) {
    var answer = question.answer
    var options = question.options
    var tweet = question.tweet
    var cor = []
    for (let i = 0; i < options.length; i++)
    {
      cor.push(options[i]===answer)
    }
    return (
      <Question upd = {this.updateSelected} key = {num} tweet = {tweet} options = {options} answer = {answer} num={num} submitted={sub} correct = {cor} inc  = {this.inc_right}></Question>
    )
  }

  total_score() {
    let score = 0
    let ans = []
      for (let i=0; i < this.state.num_questions; i++) {
        let sel = this.state.selected[i];
        let cur = this.state.questions[i];
        if (sel && cur.options[sel] === cur.answer ) {
          score++;
          ans.push(true)
        }
        else {
          ans.push(false)
        }
      }
    return [score, ans]
  }
  
  render() {
    if (!this.state.submitted) {
      return (
            <div className = 'App-body'>
              <header className = 'App-header'>
                  {this.state.title}
              </header>
              <ul className='sidebar'>
                  {this.makeSidebar()}
                  <button className='submit' onClick = {() => this.submit()}> submit answers</button>
              </ul>              
              {this.state.questions && this.display_questions(false)}
            </div>
      );
    }
    else {
      let scores = this.total_score()
      return (
        <div className = 'App-body'>
          <header className = 'App-header'>
              {this.state.title}
          </header>
          <ul className='sidebar'>
              <div className = 'score'>{scores[0]}/10</div>
              {this.makeFinalSidebar(scores[1])}
          </ul>
          {this.state.questions && this.display_questions(this.state.questions, true)}
          {/* {x} */}
        </div>
        

      )
    }
  }
}

// function display_questions(questions, sub) {
//   return questions.map((question, index) => display_question(question, index,sub))
// }

// function display_question(question, num,sub) {
//   var answer = question.answer
//   var options = question.options
//   var tweet = question.tweet
//   var cor = []
//   for (let i = 0; i < options.length; i++)
//   {
//     cor.push(options[i]===answer)
//   }
//   return (
//     <Question tweet = {tweet} options = {options} answer = {answer} num={num} submitted={sub} correct = {cor} inc  = {() => this.inc_right}></Question>
//   )
// }



export default App;
