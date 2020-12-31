
import React from "react";

import ReactWordcloud from "react-wordcloud";

/*import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";*/



  const options = {
    rotations: 0,
    rotationAngles: [-10, 0],
  };
   
  function App(props) {
    return (
      <ReactWordcloud 
        options={options}
        words={props.words}
      />
    );
  }
export default App;

