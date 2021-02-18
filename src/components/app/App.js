import './App.css';
import React from "react";
import {MainText} from "../main-text/MainText";
import {Popup} from "../popup/Popup";
import {Speed} from "../speed/Speed";
import {Accuracy} from "../accuracy/Accuracy";

export class App extends React.Component {

    speedRef = React.createRef();
    accuracyRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            showPopupLanguage: false,
            showPopupStart: true,
            accuracy: new Set(),
            correctLetterCounter: 0
        }
    }

    isShowPopupLanguage = () => {
        this.setState({
            showPopupLanguage: false
        })
    }

    popupButtonStart = () => {
        this.startAgain();
        this.setState({
            showPopupStart: false,
            startGame: true,
            finishGame: false
        });
        this.getGeographicFacts();
    }

    validationLanguage = (letter) => {
        const regexpRus = /[A-z]/;
        const regexpEng = /[А-я]/;

        let isCorrectLetter = null;
        if (this.state.language === "rus") {
            isCorrectLetter = regexpRus.test(letter)
        }
        if (this.state.language === "eng") {
            isCorrectLetter = regexpEng.test(letter)
        }

        if (isCorrectLetter) {
            this.setState({
                showPopupLanguage: true
            })
        }
    }

    keyDown = (e) => {

        const ignoredKeys = ['Shift', 'Enter', 'Control', 'Backspace', 'Alt', 'Tab', 'CapsLock', 'Escape'];

        if (ignoredKeys.includes(e.key)){
            return;
        }
        this.validationLanguage(e.key);

        if (this.state.startGame) {
            this.validationLetter(e.key);
        }
    }

    validationLetter(letter) {
        const {letters, correctLetterCounter, incorrectLetterCounter} = this.state;
        if(correctLetterCounter === letters.length - 1) {
            this.setState({
                finishGame: true,
            })
            this.isFinishGame();
        }
        if (letter === letters[correctLetterCounter]) {
            this.setState({
                correctLetterCounter: correctLetterCounter + 1,
                isCorrectLetter: true
            });
        } else {
            let accuracyState = new Set(this.state.accuracy);
            accuracyState.add(correctLetterCounter);
            this.setState({
                incorrectLetterCounter: incorrectLetterCounter + 1,
                isCorrectLetter: false,
                accuracy: accuracyState
            },);
        }
    }

    subscribes() {
        window.addEventListener('keydown', this.keyDown)
    }

    onChangeLanguage = (lang) => {
        this.setState({
            language: lang
        }, () => {
            this.getGeographicFacts();
        });
    }

    getGeographicFacts() {
        fetch("https://zavrazhneva.github.io/geographic-facts-json/geographic-facts.json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result,
                        letters: this.getRandomText(result[this.state.language]).split(''),
                        correctLetterCounter: 0,
                        incorrectLetterCounter: 0
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    componentDidMount() {
        this.subscribes();
    }

    getRandomText(data) {
        const max = Object.keys(data).length - 1;
        let rand = Math.round(Math.random() * (max));
        return data[Object.keys(data)[rand]];
    }

    startAgain = () => {
        this.setState({
            correctLetterCounter: 0,
            incorrectLetterCounter: 0,
            accuracy: new Set(),
        });
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyDown);
    }

    isFinishGame = () => {
        const speed = this.speedRef.current.resultSpeed();
        const accuracy = this.accuracyRef.current.getPrecision();
        this.setState({
            speed: speed,
            accuracyValue: accuracy,
            startGame: false
        })
    }

    render() {
        return (
            <main className="content__wrapper">
                {this.state.isLoaded && <div className="content">
                    <div className="main-text__wrapper">
                        <MainText letters={this.state.letters} correctLetters={this.state.correctLetterCounter}
                                  isCorrectLetter={this.state.isCorrectLetter}/>
                        <div className="statistic">
                            <Speed ref={this.speedRef} correctLetters={this.state.correctLetterCounter} startGame={this.state.startGame}/>
                            <Accuracy ref={this.accuracyRef} lengthText={this.state.letters.length} accuracy={this.state.accuracy}/>
                            <div className="start-again__wrapper" onClick={this.startAgain}>
                                <span className="start-again__icon"/>
                                <span className="start-again__text">Заново</span>
                            </div>
                        </div>
                    </div>

                </div>}
                {this.state.showPopupStart &&
                <Popup buttonClick={this.popupButtonStart} type={'start'}  onChangeLanguage={this.onChangeLanguage}/>}
                {this.state.showPopupLanguage && <Popup buttonClick={this.isShowPopupLanguage} type={'language'}/>}
                {this.state.finishGame && <Popup type={'finish'} buttonClick={this.popupButtonStart} speed={this.state.speed} accuracy={this.state.accuracyValue}/>}
            </main>
        )
    }
}
