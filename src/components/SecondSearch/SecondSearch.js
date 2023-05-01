import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
const autocompleteAPI = 'https://api.comparatrip.eu/cities/autocomplete/?q=';
const popularArrivalAPI= 'https://api.comparatrip.eu/cities/popular/from/';
const popularDepartureAPI = 'https://api.comparatrip.eu/cities/popular/5';


const SecondSearch = () => {
    const location = useLocation();
    const {local_name,unique_name } = location.state.name;
    
    const [departureText,setDepartureText] = useState(unique_name)
    const [departureTextName,setDepartureTextName] = useState(local_name)
    const [departureSuggestions, setDepartureSuggestions] = useState([])
    const [inputDeparture,setInputDeparture]=useState(false)
    
    const [selectedDeparture,setSelectedDeparture]=useState(true)
    const inputRef = useRef(null);
    
    const [arrivalText,setArrivalText] = useState('')
    const [arrivalTextName,setArrivalTextName] = useState('')
    const [arrivalSuggestions, setArrivalSuggestions] = useState([])
    const [inputArrival,setInputArrival]=useState(true)
    
    
    useEffect(() => {
     
      if (departureText.length > 0 && inputDeparture) {
        fetch(`${autocompleteAPI}${departureText}`)
        .then((res) => res.json())
        .then((data) => {setDepartureSuggestions(data)});
      } else if (departureText.length === 0 && inputDeparture){
        handleClickPopularDeparture()
      } else {
        setDepartureSuggestions([])
      }
    }, [departureTextName, inputDeparture,departureText]);
    
    
    
    useEffect(() => {
      if (selectedDeparture===true && arrivalText.length === 0 && inputArrival){
        inputRef.current.focus();
        fetch(`${popularArrivalAPI}${departureText}/5`)
        .then((res) => res.json())
        .then((data) => {setArrivalSuggestions(data)})
      }
      else if (arrivalText.length > 0 && inputArrival) {
        fetch(`${autocompleteAPI}${arrivalText}`)
        .then((res) => res.json())
        .then((data) => {setArrivalSuggestions(data)});
      } else if (arrivalText.length === 0 && inputArrival){
        
        handleClickPopularArrival()
      } else {
        setArrivalSuggestions([])
      }
    }, [selectedDeparture,arrivalText, inputArrival]);
    
    
    
    const handleClickPopularDeparture = async () => {
      try {
          const data = await (await fetch(popularDepartureAPI)).json()
          setDepartureSuggestions(data)
        
      } catch (err) {
          console.log(err.message)
      } 
    }
    
    const handleClickPopularArrival= async () => {
      try {
          const data = await (await fetch(popularDepartureAPI)).json()
          setArrivalSuggestions(data)
      } catch (err) {
          console.log(err.message)
      } 
    }
    
    const handleDepartureClick =  () => {
        setInputDeparture(true)
        setInputArrival(false)
    }
    
    const handleArrivalClick =  () => {
      setInputArrival(true)
      setInputDeparture(false)
    }
    
    const onChangeHandlerDeparture = (departureText) => {
      setSelectedDeparture(false)
      setDepartureTextName(departureText)
      setDepartureText(departureText)
      setInputDeparture(true)
     }
    
     const onChangeHandlerArrival = (arrivalText) => {
      setArrivalText(arrivalText)
      setArrivalTextName(arrivalText)
      setInputArrival(true)
     }
    
     const onSuggestHandlerDeparture = (departureText,departureTextName) => {
       setDepartureText(departureText);
       setDepartureTextName(departureTextName)
       setSelectedDeparture(true)
       setInputDeparture(false)
       setInputArrival(true)
     }
    
    
     const onSuggestHandlerArrival = (arrivalText,arrivalTextName) => {
      setArrivalText(arrivalText);
      setArrivalTextName(arrivalTextName)
      setInputArrival(false)
    }
    
    const onBlurDeparture =()=>{
      setTimeout(()=>{
        setInputDeparture(false)
      },200)
    }
    
    const onBlurArrival =()=>{
      setTimeout(()=>{
        setInputArrival(false)
      },200)
    }
    
    const Swapping = () => {
    
    const departureTextTemp = departureText
    const departureTextNameTemp = departureTextName
    const arrivalTextTemp = arrivalText
    const arrivalTextNameTemp=arrivalTextName
    
    setArrivalText(departureTextTemp)
    setDepartureText(arrivalTextTemp)
    setArrivalTextName(departureTextNameTemp)
    setDepartureTextName(arrivalTextNameTemp)
    
    }
    
      return (
        <div>
     <div >
      <label >Départ :&nbsp;</label>
          <input 
          placeholder='Ville de Départ'
          
          type="text"
          value={departureTextName}
          onChange={e=>onChangeHandlerDeparture(e.target.value)}
          onClick={handleDepartureClick} 
          onBlur={onBlurDeparture}
          />
       <button  onClick={Swapping}></button>
    </div>
    <div >
    <label >Arrivée : </label>
          <input
          placeholder="Ville d'Arrivée"
          
            type="text"
            onChange={e=>onChangeHandlerArrival(e.target.value)}
            value={arrivalTextName}
            onClick={handleArrivalClick} 
            onBlur={onBlurArrival}
            ref={inputRef}
          />
          </div>
    
    
       
    
          <div >
    <div >
    {departureSuggestions.length>0 && <p >Suggestions :</p>}
          {departureSuggestions && departureSuggestions.map((suggestion,i) =>
          <div key={suggestion.unique_name}  onClick={()=>onSuggestHandlerDeparture(suggestion.unique_name,suggestion.local_name)}>{suggestion.local_name}</div>
          )}
          </div>
          </div>
          <div >
          <div >
          {arrivalSuggestions.length>0 && <p >Suggestions :</p>}
          {arrivalSuggestions && arrivalSuggestions.map((suggestion,i) =>
          <div key={suggestion.unique_name} onClick={()=>onSuggestHandlerArrival(suggestion.unique_name,suggestion.local_name)} >{suggestion.local_name}</div>
          )}
    </div>
    
    </div>
    
        </div>
        
      );
}

export default SecondSearch;