import React from 'react'
import {useState, useEffect} from 'react'
import WordCloud from './WordCloud'
import StarRatingComponent from "react-star-rating-component";
import './Result.css'
import firebase from 'firebase'

function App(props){

    function showWordCloudF(e){
        if(showWordCloud===false){
            setShowWordCloud(true)
            setTextShowCloud("fermer-")
        } else {
            setShowWordCloud(false)
            setTextShowCloud("nuage+")
        }
    }
    const [FileWords, setFileWords]=useState([])
    const [showWordCloud, setShowWordCloud]=useState(false)
    const [textShowCloud, setTextShowCloud]=useState("nuage+")
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
     // let dataG=[]
     files.forEach(file=>{
      firebase.firestore().collection("Props")
      .doc(file)
      .get()
      .then(d=>(properties.push({id:d.id,prop:d.data()})))
      let tab=[]
       firebase.firestore().collection("WordsWeights")
       .onSnapshot((data)=>{
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
       dataG.push({file:file,word:tab})
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
      .then(()=>setFileWords(dataG))

      //setFileWords(dataG)
    })

    },[props])

    return(
    <React.Fragment>
     {FileWords?FileWords.map((val,key)=>(
        <div className="global">
          <div className="firstPart">
          <h2>xlv,f,xxvxv <button onClick={showWordCloudF}>{textShowCloud}</button></h2>
          <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {
           val.prop?val.prop.title:"ala"
          }
         </a>
          <p>texte texte texte texte texte texte texte texte texte texte texte texte texte texte texte
          texte texte texte texte texte texte texte texte te texte texte texte texte texte texte texte texte te texte texte texte texte texte texte texte texte texte texte texte texte texte texte texte
          </p>
          <StarRatingComponent
                             name="rate1"
                             starCount={5}
                             value={3}
                           />
             nombres cliques : {50}
          </div>
         {
             showWordCloud?
             <div className="secondPart">
             <div className="WordCloud">
              <WordCloud words={val.word}></WordCloud>
             </div>
             </div>
             :
             null
         }
      </div>      
      )):<h1>Waiting</h1>}
    </React.Fragment>
 
    )
}
export default App