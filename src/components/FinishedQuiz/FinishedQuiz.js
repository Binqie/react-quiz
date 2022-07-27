import React from "react";
import classes from './FinishedQuiz.module.css'
import Button from "../UI/Button/Button";

const FinishedQuiz = props => {
    const successCount = Object.keys(props.results).reduce((acc, elem) => {
        if (props.results[elem] === 'success') acc++
        return acc
    }, 0)

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {
                    props.quiz.map((quizItem, index) => {
                        const cls = [
                            'fa',
                            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                            classes[props.results[quizItem.id]]
                        ]

                        return (
                            <li
                                key={index}
                            >
                                <strong>{index + 1}. </strong>
                                {quizItem.question}
                                <i className={cls.join(' ')}/>
                            </li>
                        )
                    })
                }
            </ul>

            <p>Correct answers: {successCount} / {props.quiz.length}</p>

            <div>
                <Button onClick={props.onRetry} type="primary">Retry</Button>
                <Button type="success">Go to the quizzes</Button>
            </div>
        </div>
    )
}

export default FinishedQuiz