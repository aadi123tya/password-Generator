import { useState } from 'react'
import "./App.css"
import { useCallback } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

function App() {


  const [password,setPassword]  = useState('')
  const [range,ChangedRange] =useState(0)
  const [number,numbersAllow] = useState(false);
  const [symbol ,symbolsAllow] = useState(false);


  //useCallBack(fn,dependencies)
  const passwordGenerator =useCallback(()=>{
    const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvw"
    let pass  ='';
    if(number)
    {
      let s = '123456789'
      let index = Math.floor(Math.random()*s.length)
      pass+=s.charAt(index);

    }
    if(symbol)
    {
      let s = '!@#$%^&*()_+'
      let index = Math.floor(Math.random()*s.length)
      pass+=s.charAt(index);
    }
    for(let i=0;i<range;i++)
    {
      let index = Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(index);
    }
    setPassword(pass);
  },[setPassword,range,numbersAllow,symbolsAllow])

  // useEffect(fn,dependency)
  useEffect(()=>{
passwordGenerator();
  },[setPassword,range,numbersAllow,symbolsAllow])

  const passwordRef = useRef(null);
  const copytoClipboard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])
  















  return (
   <>
    <div className="box-border h-auto w-auto border-4 border-color:white  rounded-xl">
   <div className=" text-center text-6xl  mx-8"> Passoword Generator</div>
      <div className=" my-5 mx-8" >
        <input className=" my-4  w-4/5  h-9" ref={passwordRef}  placeholder='Password' value={password}/>
        <button 
        className=" h-auto w-auto   bg-green-600  rounded-md" 
        
        onClick={copytoClipboard}
        >copy</button>
      </div>
      <div className=" my-5 mx-9 text-2xl">
        <input type='range' className=" w-96 " min={0} max={50}

          onChange={
            (e)=>{ChangedRange(e.target.value)}
          }
        />
       <label> Range({range})</label>
        <input type='checkbox' className=" mx-2 w-5 h-5"
        defaultChecked={numbersAllow} 
        onChange={()=>{numbersAllow((prev)=>!prev)}}

        />
        
        <label> Numbers</label>
        <input type='checkbox'  className=" mx-2 w-5 h-5"
          defaultChecked={symbolsAllow}
          onChange={()=>{symbolsAllow((prev)=>!prev)}}
        />
        
        <label>Character</label>
      </div>
    
     </div>
   </>
  )
}

export default App
