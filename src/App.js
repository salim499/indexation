import React from 'react'
import {useState,  useEffect, useRef } from 'react'
import logo from './logo.svg';
import './Searchbar.css'
import './App.css'
import Rs from './Result.js'
import firebase from './FireStore'
import GetData from './getDataFromApi'



function App() {
  const inputRef=useRef(null)
  const [Data, setData]=useState([])
  const [Mode, setMode]=useState("Mode1")

   function lancerIndexation(){
    GetData()
   }
  function setModeF(e){
     setMode(e.target.dataset.mode)
  }

  function submitRequestF(){
    setData([])
    let splitRequest=inputRef.current.value.split(" ")
    let words=splitRequest.filter(word=>word.length>0)

    words.forEach(word=>{
      // get the first part of word request
      let firstPartR = word.substr(0, word.length / 2)  
      // get the second part of word request
      let secondPartR = word.substr(word.length / 2, word.length)
      firebase.firestore().collection("WordsWeights")
      .get()
      .then((data)=>{

      data.forEach(e=>{
      // get the first part of word bdd
      let firstPartW = e.data().text.substr(0, e.data().text.length / 2)  
      // get the second part of word bdd
      let secondPartW = e.data().text.substr(e.data().text.length / 2, e.data().text.length)

      ///////// Mode1
      if(Mode==="Mode1"){
        let count=0
        for (let i = 0; i < firstPartR.length; i++) {
          if(firstPartW.includes(firstPartR.charAt(i))){
          count=count+1
          }
        }
        for (let i = 0; i < secondPartR.length; i++) {
          if(secondPartW.includes(secondPartR.charAt(i))){
            count=count+1
          }
        }
        if(word.length-count<1){      
          //result.push({id:e.id,data:e.data()})
          setData(Data => [...Data, {id:e.id,data:e.data()}]);
        }
      }
      ////////// Mode 2
      else if(Mode==="Mode2"){
          if(
            firstPartW.includes(firstPartR)||
            secondPartW.includes(secondPartR)||
            secondPartR.includes(secondPartW)||
            firstPartR.includes(firstPartW)
            ){
              setData(Data => [...Data, {id:e.id,data:e.data()}]);
            }  
      }
      ////////// Mode 3
      else if(Mode==="Mode3"){
          let count=0
          for (let i = 0; i < word.length; i++) {
            if(e.data().text.includes(word.charAt(i))){
            count=count+1
            }
          }   
          if(Math.abs(word.length-count)<1){      
            //result.push({id:e.id,data:e.data()})
            setData(Data => [...Data, {id:e.id,data:e.data()}]);
          }      
      }
    }) 
  })
})
}


  return(
    <div className="App">
      <header className="App-header">
      <React.Fragment>
      <nav>
        <ul id="nav_bar">
          <li id="sign_in" className="nav-links"><a onClick={lancerIndexation} href="#">Lancer indexation</a></li>       
          <li id="sign_in" className="nav-links"><a onClick={setModeF} data-mode="Mode3" href="#">Mode3</a></li>
          <li id="sign_in" className="nav-links"><a onClick={setModeF} data-mode="Mode2" href="#">Mode2</a></li>
          <li id="sign_in" className="nav-links"><a onClick={setModeF} data-mode="Mode1" href="#">Mode1</a></li>
        </ul>  
      </nav>  
        <div className="logo">
          <img src={logo} className="App-logo" alt="logo" />
          <img alt="Google" src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"></img>
        </div>
        <div className="bar">
          <input className="searchbar" type="text" title="Search" ref={inputRef}></input>
        </div>
        <div className="buttons">
          <button className="button"  onClick={submitRequestF}>Recherche</button>
         </div>
    </React.Fragment>
    </header>
        <div className="results">
        <Rs Data={Data}></Rs>
      </div>

    </div>
  ) 
}

export default App;
