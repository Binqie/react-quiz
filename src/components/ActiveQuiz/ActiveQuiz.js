import React from "react";
import classes from './ActiveQuiz.module.css'
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>{props.currentAnswer}.</strong>&nbsp;
                {props.question}
            </span>

            <small>{props.currentAnswer} / {props.quizLength}</small>
        </p>

        <AnswersList 
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
            state={props.state}
        />
    </div>
)

export default ActiveQuiz