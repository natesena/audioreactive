import React from "react"
import 'aframe'

class ASphere extends React.Component{
    state={
        radius: 1
    }
    componentDidMount(){
        this.setState({
            radius: this.props.radius
        })
    }
    render() {
        return(
            <a-sphere color="yellow" position="0 3 -7" radius={this.state.radius}></a-sphere>
        )
    }
}

export default ASphere