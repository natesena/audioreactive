import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AScene from "./Components/AScene.js"
import UI from "./Components/UI.js"

const sceneStyle ={
  height: (window.innerHeight * 0.75) + "px",
  margin: "0",
  padding: "0"
}
const divStyle = {
  margin: "0",
  padding: "0"
}


class App extends Component {
  state={
    objects: [{objectType: "box", property: "rotation", secondaryProperty: "x"}],
    objectType: "box",
    property: "rotation",
    secondaryProperty: "x"
  }
  componentDidMount(){
    // console.log("starting app state: ", this.state)

  }
 
  updateUIState(){
    console.log("ui was changed")
  }
  changeNumObjects(){
    console.log("tried to change number of objects in App")
    this.setState({
        objects: [...this.state.objects, {objectType: this.state.objectType, property: this.state.property, secondaryProperty: this.state.secondaryProperty}]
    },()=>{
      console.log("The app's # of objects has changed. currentstate: ", this.state)
    })
  }
  changeProperty(evt){
      // console.log(evt.target.value)
      var objectsCopy = this.state.objects
      objectsCopy.forEach(object => {
        object.property = evt.target.value
      });
      this.setState({
          property: evt.target.value,
          objects: objectsCopy
      },()=>{
        console.log("updated primaryproperty in app: ", this.state)
      })
  }
  changeSecondaryProperty(evt){
    var objectsCopy = this.state.objects
      objectsCopy.forEach(object => {
        object.secondaryProperty = evt.target.value
      });
    this.setState({
        secondaryProperty: evt.target.value,
        objects: objectsCopy
    },()=>{
      console.log("new secondary props in app: ", this.state)
    })
  }
  render() {
    // console.log("app re-rendered")
    return (
      <div className="App">
        <div style={sceneStyle}>
          <AScene objects={this.state.objects}/>
        </div>
        <div style={divStyle}>
          {/* when I change something in the UI I want to call a "prop" function in the UI component that is stored in UI's parent component */}
          <UI property={this.state.property} secondaryProperty={this.state.secondaryProperty} numObjects={this.state.objects.length} onPropertyChange={this.changeProperty.bind(this)} onSecondaryPropertyChange={this.changeSecondaryProperty.bind(this)} onNumberChange={this.changeNumObjects.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default App;
