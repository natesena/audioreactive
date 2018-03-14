import React from "react"

const uiStyle ={
    backgroundColor: "blue",
    minHeight: (window.innerHeight * 0.25) + "px",
    color: "white",
    padding: "10px 0",
    margin: "0",
    border: "1px solid transparent"
}

const columnStyle ={
    float: "left",
    width: "33%"
}
const columnHalf = {
    float: "left",
    width: "50%"
}

class UI extends React.Component{
    state={
        numObjects: this.props.numObjects,
        property: this.props.property,
        secondaryProperty: this.props.secondaryProperty
    }
    componentDidUpdate(){
        console.log("UI props change: ", this.props)
    }
    componentWillReceiveProps(nextprops){
        if(nextprops.numObjects !== this.state.numObjects){
            this.setState({
                numObjects: nextprops.numObjects
            })
        }
    }
    render(){
        // console.log("UI re-rendered state: ", this.state)
        let secondaryPropDiv = null
        if(this.state.property === "position" || this.state.property === "rotation"){
            secondaryPropDiv =  <div style={columnHalf}>
                                    <select onChange={this.props.onSecondaryPropertyChange.bind(this)}>
                                        <option value="x">x</option>
                                        <option value="y">y</option>
                                        <option value="z">z</option>
                                    </select>
                                </div>
        }
        return(
            <div style={uiStyle}>
                <h1>Controls</h1>
                <div>
                    <div style={columnStyle}>
                        <h3>Number of Objects</h3>
                        <input onChange={this.props.onNumberChange.bind(this)} id="num-objects" type="number" step="1" value={this.state.numObjects}/>
                    </div>
                    <div style={columnStyle}>
                        <h3>Object Type</h3>
                        <select>
                            <option value="cube" >Cube</option>
                        </select>
                    </div>
                    <div style={columnStyle}>
                        <h3>Reactive Property</h3>
                        <div style={columnHalf}>
                            <select onChange={this.props.onPropertyChange.bind(this)}>
                                <option value="rotation">Rotation</option>
                                <option value="position">Position</option>
                                <option value="scale">Scale</option>
                            </select>
                        </div>
                    {secondaryPropDiv}
                    </div>
                </div>
            </div>
        )
    }
}

export default UI