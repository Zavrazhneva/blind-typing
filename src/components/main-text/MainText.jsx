import React from "react";
import './MainText.css'

export class MainText extends React.Component {

    render() {
        const { letters, correctLetters, isCorrectLetter } = this.props;
        return (
            <div className="mainText">
                {letters.map((element, index) => {
                    let classNameLetter = 'letter';
                    if(index < correctLetters) {
                        classNameLetter += ' letter__green'
                    }
                    if(index === correctLetters) {
                        classNameLetter += ' letter__cursor'
                    }
                    if ( index === correctLetters && !isCorrectLetter) {
                        classNameLetter = ' letter__error'
                    }
                    return <span key={index}  className={classNameLetter}>{element}</span>
                })}
            </div>
        )
    }
}
