import React from "react";

export class Speed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countIntervalSpeed: [],
        }
    }

    typingSpeedArr = () => {
        const { startGame } = this.props;
        if (startGame) {
            let startLettersCount = this.props.correctLetters;
            setInterval(()=> {
                this.setState({
                    countIntervalSpeed: [...this.state.countIntervalSpeed, (this.props.correctLetters - startLettersCount) * 10],
                }, () => {
                    this.resultSpeed();
                });
                startLettersCount = this.props.correctLetters;
            },6000)
        }
    }
    resultSpeed = () => {
        const resultSpeed = this.state.countIntervalSpeed.reduce((acc, item) => {
            return acc += item;
        },0) / this.state.countIntervalSpeed.length;
        this.setState({
            resultSpeed: Math.round(resultSpeed)
        })
    }

    componentDidMount() {
        this.typingSpeedArr();
    }

    render() {
        return (
            <div className="statistic">
                <div className="speed">
                    <div className="title">
                        <span className="title__icon"/>
                        <span className="title__text">Скорость</span>
                    </div>
                    <span className="speed__indicator">{this.state.resultSpeed} зн./мин</span>
                </div>
            </div>
        )
    }
}

