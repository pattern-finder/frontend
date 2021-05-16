import React from 'react';
import './App.css';
import {CodeRunning} from "./CodeRunning.jsx"


export const App = () => {


    return(
    <div className="codeRunning">
      <CodeRunning containerRef={ref => (this.current = ref)}/>
    </div>
  );
  
}

export default App;
