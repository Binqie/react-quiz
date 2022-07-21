import React, { Component } from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz"

export default class Quiz extends Component {
    state = {
        results: {

        },
        isFinished: false,
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
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]

            if (this.state.answerState[key] === 'success') return
        }

        const question = this.state.quiz[this.state.currentQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {
            if (!results[answerId]) {
                results[answerId] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results: results
            })

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({isFinished: true})
                } else {
                    this.setState({
                        currentQuestion: this.state.currentQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[question.id] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results: results
            })
        }
        
    }

    isQuizFinished() {
        return this.state.currentQuestion + 1 === this.state.quiz.length;
    }

    retryHandler = () => {
        this.setState({
            isFinished: false,
            currentQuestion: 0,
            answerState: null,
            results: {}
        })
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Give answers to all of the questions.</h1>

                    {
                        this.state.isFinished
                        ?   <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                        :   <ActiveQuiz 
                                answers={this.state.quiz[this.state.currentQuestion].answers}
                                question={this.state.quiz[this.state.currentQuestion].question}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                currentAnswer={this.state.currentQuestion + 1}
                                state={this.state.answerState}
                            />
                    }
     
                </div>
            </div>
        )
    }
}