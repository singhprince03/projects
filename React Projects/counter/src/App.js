// import logo from "./logo.svg";
import './App.css';
import React, { useState } from 'react';
import Button from './button';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

function App() {
  const [count, setCount] = useState(0);
  const incCount = () => {
    setCount(count + 1);
  };
  const decCount = () => {
    setCount(count - 1);
  };
  function resCount() {
    setCount(0);
  }
  return (
    <React.Fragment>
      <div className='App'>
        <p>Count:{count}</p>
      </div>
      <div className='App'>
        <Button action={incCount} title={'Increment'} />
        <Button action={decCount} title={'Decrement'}></Button>
        <Button action={resCount} title={'Reset'}></Button>
      </div>
    </React.Fragment>
  );
}
export default App;
