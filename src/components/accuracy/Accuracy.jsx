import React from "react";
import './Accuracy.css';

export class Accuracy extends React.Component {

    getPrecision = () => {
        const {lengthText, accuracy} = this.props;
        const currentIncorrectLetter = Array.from(accuracy).length;
        const totalPercent = currentIncorrectLetter * 100 / lengthText;
        return 100 - Math.floor(totalPercent * 10) / 10;
    }

    render() {
        return (
            <div className="accuracy">
                <div className="title">
                    <span className="accuracy__icon"/>
                    <span className="accuracy__text">Точность</span>
                </div>
                <span className="speed__indicator">{this.getPrecision()} %</span>
            </div>
        )
    }
}

