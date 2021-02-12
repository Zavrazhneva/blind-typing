import React from "react";
import './Popup.css'
import img from '../../assets/global.svg'

export class Popup extends React.Component {

    render() {
        return (
            <div className="popup__wrapper">
                <div className="popup">
                    <img src={img} className="popup__icon"/>
                    <p>Пожалуйста, смени раскладку клавиатуры на Русский.</p>
                    <div className="popup__button" onClick={this.props.buttonClick}>Продолжить</div>
                </div>
            </div>
        )
    }
}
