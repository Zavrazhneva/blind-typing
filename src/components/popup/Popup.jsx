import React from "react";
import './Popup.css'
import languageImg from '../../assets/global.svg';
import startImg from '../../assets/start.svg';
import resultImg from '../../assets/student.png';

const dataPopup = {
    startPopup: {
        image: startImg,
        text:'Приготовься печатать. Поехали!',
        buttonText:'Начать'
    },
    languagePopup: {
        image: languageImg,
        text:'Пожалуйста, смени раскладку клавиатуры',
        buttonText:'Продолжить'
    },
    finishPopup: {
        image: resultImg,
        text:'Неплохой результат!',
        buttonText:'Начать заново'
    }
}

export class Popup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            language: 'rus'
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.onKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onKeyDown);
    }

    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.onClickButton();
        }
    };

    onChangeLanguage = (e) => {
        this.setState({
            language: e.target.value
        })
    }

    onClickButton = () => {
        this.props.buttonClick();
        if(this.props.type === 'start') {
            this.props.onChangeLanguage(this.state.language);
        }
    }

    render() {
        const {type, speed, accuracy} = this.props;

        let currentDataPopup = null;
        if(type === 'start') {
            currentDataPopup = dataPopup.startPopup;
        }
        if(type === 'language') {
            currentDataPopup = dataPopup.languagePopup;
        }
        if(type === 'finish') {
            currentDataPopup = dataPopup.finishPopup;
        }
        return (
            <div className="popup__wrapper">
                <div className="popup">
                    {type === 'start' && <select className="popup__select" name="select" onChange={this.onChangeLanguage}>
                        <option value="rus" >Русский</option>
                        <option value="eng">English</option>
                    </select>}
                    {type === 'finish' && <div className="statistic">
                        <span>Скорость: {speed} зн/мин</span>
                        <span>Точность: {accuracy} %</span>
                    </div>}
                    <div className="popup__content">
                        <img src={currentDataPopup.image} alt="icon" className="popup__icon"/>
                        <p>{currentDataPopup.text}</p>
                    </div>
                    <div className="popup__button" onClick={this.onClickButton}>{currentDataPopup.buttonText}</div>
                </div>
            </div>
        )
    }
}
