// import React from 'react';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//      {this.props.children}
//     </div>
//   );
// }

// export default App;
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div style={{width:'100vw',height:'100vh'}}>
        {this.props.children}
      </div>
    );
  }
}

export default App;
