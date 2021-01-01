import React from 'react'
import {useState, useEffect, useRef} from 'react'
import WordCloud from './WordCloud'
import StarRatingComponent from "react-star-rating-component";
import './Result.css'
import firebase from 'firebase'

function App(props){

  function splitTable(table){
    let compt=[]
    let count=0
    for(let i=0;i<table.length;i=i+5){
      count++
      compt.push(count)
    }

      return compt
  }
  function paginationNumber(e){
    let limit=e.target.dataset["val"]*5
    setFileWords2(FileWords.slice(limit-5,limit))
 }

    function showWordCloudF(e){
           let a=e.target.dataset.val
           if(FileWords2.find(el=>el.file===a).showWordCloud===false){
            FileWords2.find(el=>el.file===a).showWordCloud=true
            FileWords2.find(el=>el.file===a).nuage="Fermer-" 
            FileWords2.find(el=>el.file===a).background="#ffffff" 
           }else{
            FileWords2.find(el=>el.file===a).showWordCloud=false      
            FileWords2.find(el=>el.file===a).nuage="Nuage+" 
            FileWords2.find(el=>el.file===a).background="none"     
           }
           let b=[]
           FileWords2.forEach(e=>{
              b.push(e)
           })
            setFileWords2(b)
    }
    function numberVisitF(e){
      let f= firebase
             .firestore()
             .collection("Props")
             .doc(e.target.dataset.val)
             .get()
             .then(d=>{
              firebase
              .firestore()
              .collection("Props")
              .doc(e.target.dataset.val)
              .update({ nbrVisites: d.data().nbrVisites+1}); 
             })

    }

    const nbrVisites=useRef(null) 
    let [FileWords2, setFileWords2]=useState([])
    const [FileWords, setFileWords]=useState([])
    let dataG=[]
    useEffect(()=>{
      let properties=[]
    //get all files 
    setFileWords(null)
      let files=[]
     props.Data.forEach(element => {
       if(files.includes(element.data.file)===false){
          files.push(element.data.file)
       }  
     });
     if(files.length===0){
       setFileWords2([])
       setFileWords([])
     }
     // let dataG=[]
     files.forEach(file=>{
      firebase.firestore().collection("Props")
      .doc(file)
      .get()
      .then(d=>(properties.push({id:d.id,prop:d.data()})))
      let tab=[]
       firebase.firestore().collection("WordsWeights")
       .get()
       .then((data)=>{
         data.forEach(e=>{
           if(e.data().file===file){
             let f=tab.find(el=>el.text===e.data().text)
             if(!f){
              tab.push({text:e.data().text, value:parseFloat(e.data().weight)})
             }
             else{
               f.value=parseFloat(f.value)+parseFloat(e.data().weight)
             }
           }
         })
       })
       dataG.push({
         file:file,
         word:tab,
         showWordCloud:false,
         nuage:"Nuage +",
         background:"none"
        })
     })
    /* dataG.forEach(element=>{
       let f=properties.find(e=>element.file===e.id)
       if(f){
        element['prop']=f.prop
       }
     })*/
     dataG.forEach(e=>{
      firebase.firestore().collection("Props")
      .doc(e.file)
      .get()
      .then(d=>e.prop=d.data())
      .then(()=>{
      let compt=1
      let tab=[]
      for(let i=0;i<dataG.length;i=i+5){
        tab.push(compt)
        compt++
      }
      setFileWords(dataG)
      setFileWords2(dataG.slice(0,5))
      console.log("ddddddddddddddddddddddddddddd")
      })   
    })


    },[props])


    return(
    <React.Fragment>
     {FileWords2 && FileWords2!==null?FileWords2.map((val,key)=>(
         val.prop?
        <div className="global">
          <div className="firstPart" style={{background:"white"}}>
          <h2>xlv,f,xxvxv<button className="myButton" data-val={val.file} onClick={showWordCloudF}>{val.nuage}</button></h2>
          <a
          onClick={numberVisitF}
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
         <h2  data-val={val.file}>
          {
           (val.prop['title'])?(val.prop['title']):
           (val.prop['description'])?(val.prop['description']):
           (val.prop['keywords'])?(val.prop['keywords']):null      
          }
          </h2>
         </a>
          <p>
          {
           (val.prop['description'])?(val.prop['description']):
           (val.prop['keywords'])?(val.prop['keywords']):null 
          }           
          </p>
          <p>
          {
          (val.prop['keywords'])?(val.prop['keywords']):
          (val.prop['description'])?(val.prop['description']):null   
          }           
          </p>
          <StarRatingComponent
                             name="rate1"
                             starCount={5}
                             value={val.prop.nbrVisites}
                           />
             <p ref={nbrVisites} data-val2={val.prop.nbrVisites}>nombres de visites : {val.prop.nbrVisites}</p>
          </div>
         {
             val.showWordCloud?
             <div className="secondPart">
             <div className="WordCloud" style={{background:"#000000"}}>
              <WordCloud words={val.word}></WordCloud>
             </div>
             </div>
             :
             null
         }
      </div>      
      :null)):null}
        <div className="Footer">
        {FileWords?splitTable(FileWords).map((val,key)=>(
        <p>
         <a onClick={paginationNumber}
         data-val={val}
         className="App-link"
         href="#"
         rel="noopener noreferrer"
       >
       {val}
       </a>
       &ensp;
       &nbsp;
       </p> 
        )):null}
        </div>
    </React.Fragment>
 
    )
}
export default App