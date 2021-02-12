import './App.css';
import React from "react";
import {MainText} from "../main-text/MainText";
import {Popup} from "../popup/Popup";



export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            showPopupLanguage: false,
            showPopupStart: true
        }
        this.keyDown = this.keyDown.bind(this);
        this.popupButtonLanguage = this.popupButtonLanguage.bind(this);
        this.popupButtonStart = this.popupButtonStart.bind(this);

    }

    popupButtonLanguage() {
        this.setState({
            showPopupLanguage: false
        })
    }

    popupButtonStart() {
        this.setState({
            showPopupStart: false
        })
    }


    keyDown(e) {
        const regexp = /[A-z]/;
        if(regexp.test(e.key)) {
            this.setState({
                showPopupLanguage: true
            })
        }
    }

    subscribes() {
        window.addEventListener('keydown', this.keyDown)
    }

    getGeographicFacts() {
        fetch("https://zavrazhneva.github.io/geographic-facts-json/geographic-facts.json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result,
                        dataItem: this.getRandomText(Object.keys(result).length-1, result).split('')
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
        this.getGeographicFacts();
        this.subscribes();
    }

    getRandomText(max, data) {
        let rand = Math.round(Math.random() * (max));
        return data[Object.keys(data)[rand]];
    }

    render() {
        return (
            <div className="content">
                {this.state.isLoaded && <MainText dataItem={this.state.dataItem} />}
                {this.state.showPopupStart && <Popup buttonClick={this.popupButtonStart} type={'start'}/>}
                {this.state.showPopupLanguage && <Popup buttonClick={this.popupButtonLanguage} type={'language'}/>}
            </div>
        )
    }
}
