import React from 'react';
import './App.css';
import {CodeRunning} from "./CodeRunning.jsx"


class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
    <div className="codeRunning">
      <CodeRunning containerRef={ref => (this.current = ref)}/>
    </div>
  );
  }
}

export default App;
