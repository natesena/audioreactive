import React from "react"
import 'aframe'
import MovingBox from './MovingBox.js'

class AScene extends React.Component{
    state={
        movingObjects: this.props.objects,
        volume: 0
    }
    componentDidMount(){
        // this.startStream()
        console.log("Should ask for navigator info")
    }
   
    componentDidUpdate(){
      console.log("new objects prop in ascene: ", this.props.objects, "state: ", this.state.movingObjects)
    }
    componentWillReceiveProps(nextprops){
        console.log("Ascene updated with nextprops:", nextprops, " not yet re-rendered")
        if(nextprops !== this.state){
            console.log("changing Ascene state to reflect updated props")
            this.setState({
                movingObjects: nextprops.objects
            })
        }
    }
    render(){
        console.log("Ascene re-rendered. state: ", this.state)
        return(
            <a-scene embedded>
            {this.state.movingObjects.map((object,index)=>{
                return(
                    <MovingBox 
                        key={`movingObject-${index}`} 
                        position={`0 ${1.5 * index} -5`} 
                        objectType={this.state.movingObjects[index].objectType}
                        property={this.state.movingObjects[index].property} 
                        secondaryProperty={this.state.movingObjects[index].secondaryProperty}
                    />
                )
            })}
                <a-circle src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Long_Shadows_on_the_Lunar_Surface_-_GPN-2000-001485.jpg" position="0 -3 0" rotation="-90 0 0" radius="20"></a-circle>
                <a-sky src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Earth_lights_vs_population_density.png">
                    <a-animation
                    attribute="rotation"
                    dur="100000"
                    fill="forwards"
                    easing="linear"
                    to="0 360 0"
                    repeat="indefinite">
                    </a-animation>
                </a-sky>
            </a-scene>
        )
    }
}

export default AScene