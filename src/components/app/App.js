import './App.css';
import React from "react";
import {MainText} from "../main-text/MainText";
import {Popup} from "../popup/Popup";
import {Speed} from "../speed/Speed";

export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            showPopupLanguage: false,
            showPopupStart: true
        }
        this.popupButtonStart = this.popupButtonStart.bind(this);

    }

    popupButtonLanguage = () => {
        this.setState({
            showPopupLanguage: false
        })
    }

    popupButtonStart = () => {
        this.setState({
            showPopupStart: false,
            startGame: true
        })
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
        if (e.key === 'Shift') {
            return;
        }
        this.validationLanguage(e.key);

        if (this.state.startGame) {
            this.validationLetter(e.key);
        }
    }

    validationLetter(letter) {
        const {letters, correctLetterCounter, incorrectLetterCounter} = this.state;
        if (letter === letters[correctLetterCounter]) {
            this.setState({
                correctLetterCounter: correctLetterCounter + 1,
                isCorrectLetter: true
            });
        } else {
            this.setState({
                incorrectLetterCounter: incorrectLetterCounter + 1,
                isCorrectLetter: false
            });
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

    render() {
        return (
            <main className="content__wrapper">
                {this.state.isLoaded && <div className="content">
                    <div className="main-text__wrapper">
                        <MainText letters={this.state.letters} correctLetters={this.state.correctLetterCounter}
                                  isCorrectLetter={this.state.isCorrectLetter}/>
                        <Speed correctLetters={this.state.correctLetterCounter} startGame={this.state.startGame}/>
                    </div>

                </div>}
                {this.state.showPopupStart &&
                <Popup buttonClick={this.popupButtonStart} type={'start'} onChangeLanguage={this.onChangeLanguage}/>}
                {this.state.showPopupLanguage && <Popup buttonClick={this.popupButtonLanguage} type={'language'}/>}

            </main>
        )
    }
}
