import { useState } from 'react';
import './index.css';
import Save from './Save';

function App() {
const [visible,setVisible]=useState(false);

  const toogle=()=>{
setVisible(!visible);
console.log(visible)
  }
  return (
    <div className="App">
     <header className='w-100 bg-info p-2 d-inline-flex' >
      
      <h3 className='text-white'> <i className="bi bi-chevron-left me-1"></i>  View Audience </h3>
     </header>
     <div className='container mt-5 ms-2 '>
      <button className='btn border-2 border-white text-white fs-5 rounded-0' onClick={toogle}>Save segment</button>
     </div>
     {visible&& <Save toogle={toogle} />}
    </div>
  );
}

export default App;
