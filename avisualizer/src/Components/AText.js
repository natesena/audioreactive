import React from "react"
import "aframe"

class AText extends React.Component {
    render() {
        return (
            <a-text value={this.props.title} color="black"></a-text>
        )
    }
    componentDidMount() {

    }
}

export default AText