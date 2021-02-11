import './App.css';
import React from "react";
import {MainText} from "../main-text/MainText";



export class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false
        }
    }

    getGeographicFacts() {
        fetch("https://zavrazhneva.github.io/geographic-facts-json/geographic-facts.json")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        data: result,
                        dataItem: this.getRandomText(Object.keys(result).length-1, result)
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
    }

    getRandomText(max, data) {
        let rand = Math.round(Math.random() * (max));
        return data[Object.keys(data)[rand]];
    }

    render() {
        return (
            <div className="content">
                {this.state.isLoaded && <MainText dataItem={this.state.dataItem} />}
            </div>
        )
    }
}
