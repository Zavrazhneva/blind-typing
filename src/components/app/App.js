import './App.css';
import React from "react";
import {MainText} from "../main-text/MainText";
import {Popup} from "../popup/Popup";



export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            showPopup: false,
        }
        this.keyDown = this.keyDown.bind(this);
        this.popupButtonClick = this.popupButtonClick.bind(this);

    }

    popupButtonClick() {
        this.setState({
            showPopup: false
        })
    }


    keyDown(e) {
        const regexp = /[A-z]/;
        if(regexp.test(e.key)) {
            this.setState({
                showPopup: true
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
                {this.state.showPopup && <Popup buttonClick={this.popupButtonClick}/>}
            </div>
        )
    }
}
