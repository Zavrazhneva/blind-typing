import React from "react";
import './Popup.css'
import languageImg from '../../assets/global.svg';
import startImg from '../../assets/start.svg';

const dataPopup = {
    startPopup: {
        image: startImg,
        text:'Приготовься печатать. Поехали!',
        buttonText:'Начать'
    },
    languagePopup: {
        image: languageImg,
        text:'Пожалуйста, смени раскладку клавиатуры на',
        buttonText:'Продолжить'
    }
}

export class Popup extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let currentDataPopup = null;
        if(this.props.type === 'start') {
            currentDataPopup = dataPopup.startPopup;
            console.log(currentDataPopup)
        }
        if(this.props.type === 'language') {
            currentDataPopup = dataPopup.languagePopup;
        }
        return (

            <div className="popup__wrapper">
                <div className="popup">
                    {this.props.type === 'start' && <select></select>}
                    <img src={currentDataPopup.image} className="popup__icon"/>
                    <p>{currentDataPopup.text}</p>
                    <div className="popup__button" onClick={this.props.buttonClick}>{currentDataPopup.buttonText}</div>
                </div>
            </div>
        )
    }
}
