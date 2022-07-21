import React, { Component } from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

export default class Quiz extends Component {
    state = {
        currentQuestion: 0,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: 'What color is sky?',
                rightAnswerId: 2,
                answers: [
                    {text: 'White', id: 1},
                    {text: 'Blue', id: 2},
                    {text: 'Red', id: 3},
                    {text: 'Orange', id: 4},
                ],
            },
            {
                id: 2,
                question: 'Two plus two?',
                rightAnswerId: 3,
                answers: [
                    {text: 3, id: 1},
                    {text: 1, id: 2},
                    {text: 4, id: 3},
                    {text: 5, id: 4},
                ],
            },
            {
                id: 3,
                question: 'How many letters are there in Alphabet?',
                rightAnswerId: 1,
                answers: [
                    {text: 26, id: 1},
                    {text: 32, id: 2},
                    {text: 36, id: 3},
                    {text: 30, id: 4},
                ],
            },
        ]
    }

    onAnswerClickHandler = (answerId) => {
        const question = this.state.quiz[this.state.currentQuestion]

        if (question.rightAnswerId === answerId) {
            this.setState({answerState: {[answerId]: 'success'}})

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    console.log('finished');
                } else {
                    this.setState({
                        currentQuestion: this.state.currentQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)

        } else {
            this.setState({answerState: {[answerId]: 'error'}})
        }
        
    }

    isQuizFinished() {
        return this.state.currentQuestion + 1 === this.state.quiz.length;
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Give answers to all of the questions.</h1>

                    <ActiveQuiz 
                        answers={this.state.quiz[this.state.currentQuestion].answers}
                        question={this.state.quiz[this.state.currentQuestion].question}
                        onAnswerClick={this.onAnswerClickHandler}
                        quizLength={this.state.quiz.length}
                        currentAnswer={this.state.currentQuestion + 1}
                        state={this.state.answerState}
                    />
                </div>
            </div>
        )
    }
}