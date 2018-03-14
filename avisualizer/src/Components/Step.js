import AFRAME from 'aframe'
//import all movingMethods

var audioContext
var analyser
var microphone
var javascriptNode
var volume
 
const audioSetup = ()=>{
    navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
    navigator.getUserMedia({
        audio: true
        },
        function(stream) {
         audioContext = new AudioContext();
         analyser = audioContext.createAnalyser();
         microphone = audioContext.createMediaStreamSource(stream);
         javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(javascriptNode);
        javascriptNode.connect(audioContext.destination);


        javascriptNode.onaudioprocess = function() {
            var array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            var values = 0;

            var length = array.length;
            for (var i = 0; i < length; i++) {
                values += (array[i]);
            }

            volume = values / length;
            // console.log("values: ", average)
            // return average

    //          console.log(Math.round(average - 40));

       

            } // end fn stream
        },
        function(err) {
        console.log("The following error occured: " + err.name)
        });
    } else {
    console.log("getUserMedia not supported");
}
}

const move = (movingItem, property, secondaryProperty) => {
    console.log("volume in move: ",volume)
  // If changing position
  if (property === "position") {
      console.log("step is position")
    // Get item's position
    var currentPosition = movingItem.components.position.data
    // console.log(currentPosition)
    // If changing x
    if (secondaryProperty === "x") {
      currentPosition.x += 0.01 * (volume || 1)
    //   currentPosition.y = Math.sin(Date.now())
      // If changing y
    } else if (secondaryProperty === "y") {
      currentPosition.y += 0.01 * (volume || 1)
    //   currentPosition.x += Math.sin(Date.now())
      // If changing z
    } else if (secondaryProperty === "z") {
      currentPosition.z += 0.01 * (volume || 1)
    //   currentPosition.x = Math.sin(Date.now())
    }
    // Update item's position
    console.log("post current position: ", currentPosition)
    movingItem.setAttribute('position', currentPosition);
  }
  if(property === "rotation"){
      console.log("rotation prop in step")
      var currentRotation = movingItem.components.rotation.data
      if (secondaryProperty === "x") {
        currentRotation.x += 1 * (volume || 1)
      } else if (secondaryProperty === "y") {
        currentRotation.y += 1 * (volume || 1)
      } else if (secondaryProperty === "z") {
        currentRotation.z += 1 * (volume || 1)
      }
      console.log("post current rotation: ", currentRotation)
      movingItem.setAttribute('rotation', currentRotation)
  }
}

AFRAME.registerComponent('step', {
  init: function () {
  },
  tick: function (t, dt) {
    var movingItems = document.querySelectorAll('.Reactive')
    if(movingItems){
        console.log("items should be moving")
        for(let i = 0; i < movingItems.length; i++){
            console.log("move property in step:", movingItems[i].components.reactiveinfo.data.primaryProperty)
            move(movingItems[i], movingItems[i].components.reactiveinfo.data.primaryProperty, movingItems[i].components.reactiveinfo.data.secondaryProperty)
        }
    }
  }
});

AFRAME.registerComponent('reactiveinfo', {
    schema: {
        primaryProperty:  {type: 'string', default: 'position'},
        secondaryProperty: {type: 'string', default: 'x'}
    },
    init: function () {
        audioSetup()
        var movingItems = document.querySelectorAll('.Reactive')
        // console.log("component primary prop:", movingItems[0].components.reactiveinfo.data.primaryProperty)
        // console.log("component secondary prop:", movingItems[0].components.reactiveinfo.data.secondaryProperty)
    }
  })

 