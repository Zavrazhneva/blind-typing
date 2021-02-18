import React from "react";
import './Speed.css';

export class Speed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countIntervalSpeed: [],
            resultSpeed: 0
        }
    }

    typingSpeedArr = () => {
        const { startGame } = this.props;
        if (startGame) {
            let startLettersCount = this.props.correctLetters;
            setInterval(()=> {
                const countIntervalSpeed = [...this.state.countIntervalSpeed, (this.props.correctLetters - startLettersCount) * 10];
                this.setState({
                    countIntervalSpeed,
                    resultSpeed: this.resultSpeed(countIntervalSpeed)
                });
                startLettersCount = this.props.correctLetters;
            },6000)
        }
    }
    resultSpeed = (countIntervalSpeed = this.state.countIntervalSpeed) => {
        const resultSpeed = countIntervalSpeed.reduce((acc, item) => {
            return acc += item;
        },0) / countIntervalSpeed.length;
        return Math.round(resultSpeed);
    }

    componentDidMount() {
        this.typingSpeedArr();
    }

    render() {
        return (
            <div className="speed">
                <div className="title">
                    <span className="speed__icon"/>
                    <span className="speed__text">Скорость</span>
                </div>
                <span className="speed__indicator">{this.state.resultSpeed} зн./мин</span>
            </div>
        )
    }
}

