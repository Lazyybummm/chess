import { useState } from "react";

function App(){
  const [active,setactive]=useState("")
  function handleclick(event){
    const x_parsed=Math.ceil(event.clientX/75)
    const y_parsed=Math.ceil(event.clientY/75)
    
    console.log(x_parsed,y_parsed);

  }
  return <>
  
  <svg
  onClick={(e)=>{handleclick(e)}}
  width="600"
  height="600"
  viewBox="0 0 600 600"
  xmlns="http://www.w3.org/2000/svg"
>
  <rect x="0" y="0" width="75" height="75" fill="#f0d9b5"/>
  <rect x="75" y="0" width="75" height="75" fill="#b58863"/>
  <rect x="150" y="0" width="75" height="75" fill="#f0d9b5"/>
  <rect x="225" y="0" width="75" height="75" fill="#b58863"/>
  <rect x="300" y="0" width="75" height="75" fill="#f0d9b5"/>
  <rect x="375" y="0" width="75" height="75" fill="#b58863"/>
  <rect x="450" y="0" width="75" height="75" fill="#f0d9b5"/>
  <rect x="525" y="0" width="75" height="75" fill="#b58863"/>

  <rect  x="0" y="75" width="75" height="75" fill="#b58863"/>
  <rect x="75" y="75" width="75" height="75" fill="#f0d9b5"/>
  <rect x="150" y="75" width="75" height="75" fill="#b58863"/>
  <rect x="225" y="75" width="75" height="75" fill="#f0d9b5"/>
  <rect x="300" y="75" width="75" height="75" fill="#b58863"/>
  <rect x="375" y="75" width="75" height="75" fill="#f0d9b5"/>
  <rect x="450" y="75" width="75" height="75" fill="#b58863"/>
  <rect x="525" y="75" width="75" height="75" fill="#f0d9b5"/>

 
  <rect x="0" y="150" width="75" height="75" fill="#f0d9b5"/>
  <rect x="75" y="150" width="75" height="75" fill="#b58863"/>
  <rect x="150" y="150" width="75" height="75" fill="#f0d9b5"/>
  <rect x="225" y="150" width="75" height="75" fill="#b58863"/>
  <rect x="300" y="150" width="75" height="75" fill="#f0d9b5"/>
  <rect x="375" y="150" width="75" height="75" fill="#b58863"/>
  <rect x="450" y="150" width="75" height="75" fill="#f0d9b5"/>
  <rect x="525" y="150" width="75" height="75" fill="#b58863"/>

  
  <rect x="0" y="225" width="75" height="75" fill="#b58863"/>
  <rect x="75" y="225" width="75" height="75" fill="#f0d9b5"/>
  <rect x="150" y="225" width="75" height="75" fill="#b58863"/>
  <rect x="225" y="225" width="75" height="75" fill="#f0d9b5"/>
  <rect x="300" y="225" width="75" height="75" fill="#b58863"/>
  <rect x="375" y="225" width="75" height="75" fill="#f0d9b5"/>
  <rect x="450" y="225" width="75" height="75" fill="#b58863"/>
  <rect x="525" y="225" width="75" height="75" fill="#f0d9b5"/>

  
  <rect x="0" y="300" width="75" height="75" fill="#f0d9b5"/>
  <rect x="75" y="300" width="75" height="75" fill="#b58863"/>
  <rect x="150" y="300" width="75" height="75" fill="#f0d9b5"/>
  <rect x="225" y="300" width="75" height="75" fill="#b58863"/>
  <rect x="300" y="300" width="75" height="75" fill="#f0d9b5"/>
  <rect x="375" y="300" width="75" height="75" fill="#b58863"/>
  <rect x="450" y="300" width="75" height="75" fill="#f0d9b5"/>
  <rect x="525" y="300" width="75" height="75" fill="#b58863"/>

  
  <rect x="0" y="375" width="75" height="75" fill="#b58863"/>
  <rect x="75" y="375" width="75" height="75" fill="#f0d9b5"/>
  <rect x="150" y="375" width="75" height="75" fill="#b58863"/>
  <rect x="225" y="375" width="75" height="75" fill="#f0d9b5"/>
  <rect x="300" y="375" width="75" height="75" fill="#b58863"/>
  <rect x="375" y="375" width="75" height="75" fill="#f0d9b5"/>
  <rect x="450" y="375" width="75" height="75" fill="#b58863"/>
  <rect x="525" y="375" width="75" height="75" fill="#f0d9b5"/>

  
  <rect  x="0" y="450" width="75" height="75" fill="#f0d9b5"/>
  <rect x="75" y="450" width="75" height="75" fill="#b58863"/>
  <rect x="150" y="450" width="75" height="75" fill="#f0d9b5"/>
  <rect x="225" y="450" width="75" height="75" fill="#b58863"/>
  <rect x="300" y="450" width="75" height="75" fill="#f0d9b5"/>
  <rect x="375" y="450" width="75" height="75" fill="#b58863"/>
  <rect x="450" y="450" width="75" height="75" fill="#f0d9b5"/>
  <rect x="525" y="450" width="75" height="75" fill="#b58863"/>


  <rect x="0" y="525" width="75" height="75" fill="#b58863"/>
  <rect x="75" y="525" width="75" height="75" fill="#f0d9b5"/>
  <rect x="150" y="525" width="75" height="75" fill="#b58863"/>
  <rect x="225" y="525" width="75" height="75" fill="#f0d9b5"/>
  <rect x="300" y="525" width="75" height="75" fill="#b58863"/>
  <rect x="375" y="525" width="75" height="75" fill="#f0d9b5"/>
  <rect x="450" y="525" width="75" height="75" fill="#b58863"/>
  <rect x="525" y="525" width="75" height="75" fill="#f0d9b5"/>

</svg>

  </>
}

export default App;