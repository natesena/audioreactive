import React from "react"
import "aframe"
import'./Step'

class MovingObject extends React.Component{
    state={
        position: this.props.position,
        primaryProperty: this.props.property,
        secondaryProperty: this.props.secondaryProperty
    }
    componentDidUpdate(){
        console.log("a moving box changed ", "props: ", this.props, " state: ", this.state)
    }
    componentWillReceiveProps(nextprops){
        //this function checks if the updated props equal the current state
        console.log("next props of moving box: ", nextprops)
        if(nextprops !== this.state){
            this.setState({
                position:nextprops.position,
                primaryProperty:  nextprops.property,
                secondaryProperty: nextprops.secondaryProperty
            },()=>{
                console.log("MovingBox should update")
                var movingItems = document.querySelectorAll('.Reactive')
                console.log("moving box moving items query selector result: ", movingItems)
                let newinfo = {primaryProperty: nextprops.property, secondaryProperty: nextprops.secondaryProperty}
                console.log("new movingbox info:", newinfo)
                movingItems.forEach((movingItem, index)=>{
                    movingItems[index].setAttribute('reactiveinfo', newinfo)
                })
            })
        }
        //setattribute of component in here
    }
    
    render(){
        console.log("Moving Object re-rendered", this.state)
        return(
            <a-box class="Reactive" step reactiveinfo={{primaryProperty: this.state.primaryProperty, secondaryProperty: this.state.secondaryProperty}} position={this.state.position} color="red" ></a-box>
        )
    }
}

export default MovingObject