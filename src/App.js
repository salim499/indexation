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
  const [Result, setResult]=useState([])
 // GetData()
  function submitRequestF(){

    let result=[]
    let splitRequest=inputRef.current.value.split(" ")
    let words=splitRequest.filter(word=>word.length>0)
// firstMode

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

      //count
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
      if(word.length-count<2){
        
        result.push({id:e.id,data:e.data()})
        setData(Data => [...Data, {id:e.id,data:e.data()}]);
      }

    })  
  })
      //console.log("data "+doc.data().text.length,"count "+count,"request "+sentence.length)
    })
    setData(result)
  }


  useEffect(()=>{
      setData(Data)
      console.log(Data)
  },[Data])

  return(
    <React.Fragment>
      {console.log(Result)}
      <header className="App-header">
      <React.Fragment>
        <div className="logo">
          <img src={logo} className="App-logo" alt="logo" />
          <img alt="Google" src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"></img>
        </div>
        <div className="bar">
          <input class="searchbar" type="text" title="Search" ref={inputRef}></input>
        </div>
        <div className="buttons">
          <button className="button"  onClick={submitRequestF}>Recherche</button>
         </div>
    </React.Fragment>
    </header>
        <div className="results">
        <Rs Data={Data}></Rs>
      </div>

    </React.Fragment>
  ) 
}

export default App;
