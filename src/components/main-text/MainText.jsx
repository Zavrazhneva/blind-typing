import React from "react";
import './MainText.css'

export class MainText extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mainText">{this.props.dataItem}</div>
        )
    }
}
