import { useState, useEffect, useRef } from 'react';
import styles from './SecondSearch.module.css';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTreeCity } from '@fortawesome/free-solid-svg-icons'
import { faRetweet } from '@fortawesome/free-solid-svg-icons'
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
     <div className={styles.searchContainer}>
      <label className={styles.searchContainerLabel}>Départ :&nbsp;</label>
          <input 
          placeholder='Ville de Départ'
          className={styles.searchInput}
          type="text"
          value={departureTextName}
          onChange={e=>onChangeHandlerDeparture(e.target.value)}
          onClick={handleDepartureClick} 
          onBlur={onBlurDeparture}
          />
       <button className={styles.swapButton} onClick={Swapping}><FontAwesomeIcon icon={faRetweet} style={{fontSize:"20px"}}/></button>
    </div>
    <div className={styles.searchContainer}>
    <label className={styles.searchContainerLabel}>Arrivée : </label>
          <input
          placeholder="Ville d'Arrivée"
          className={styles.searchInput}
            type="text"
            onChange={e=>onChangeHandlerArrival(e.target.value)}
            value={arrivalTextName}
            onClick={handleArrivalClick} 
            onBlur={onBlurArrival}
            ref={inputRef}
          />
          </div>
    
    
       
    
          <div className={styles.dropdownContainer}>
    <div className={styles.dropdown}>
    {departureSuggestions.length>0 && <p className={styles.dropdownRowTitle}>Suggestions :</p>}
          {departureSuggestions && departureSuggestions.map((suggestion,i) =>
          <div key={suggestion.unique_name} className={styles.dropdownRow} onClick={()=>onSuggestHandlerDeparture(suggestion.unique_name,suggestion.local_name)}><FontAwesomeIcon icon={faTreeCity} style={{color: "#34a853",marginRight:"10px"}} />{suggestion.local_name}</div>
          )}
          </div>
          </div>
          <div className={styles.dropdownContainer}>
          <div className={styles.dropdown}>
          {arrivalSuggestions.length>0 && <p className={styles.dropdownRowTitle}>Suggestions :</p>}
          {arrivalSuggestions && arrivalSuggestions.map((suggestion,i) =>
          <div key={suggestion.unique_name} className={styles.dropdownRow} onClick={()=>onSuggestHandlerArrival(suggestion.unique_name,suggestion.local_name)} ><FontAwesomeIcon icon={faTreeCity} style={{color: "#34a853",marginRight:"10px"}} />{suggestion.local_name}</div>
          )}
    </div>
    
    </div>
    
        </div>
        
      );
}

export default SecondSearch;