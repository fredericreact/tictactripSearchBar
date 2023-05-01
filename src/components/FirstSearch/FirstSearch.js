import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faTreeCity } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import styles from './FirstSearch.module.css'
import { useNavigate } from 'react-router-dom';
const autocompleteAPI = 'https://api.comparatrip.eu/cities/autocomplete/?q=';
const popularDepartureAPI = 'https://api.comparatrip.eu/cities/popular/5';

const FirstSearch = () => {
const [inputText,setInputText] = useState('')
const [suggestions, setSuggestions] = useState([])
const [inputSelected,setInputSelected]=useState(false)

let navigate = useNavigate();

useEffect(() => {
 
  if (inputText.length > 0 && inputSelected) {
    fetch(`${autocompleteAPI}${inputText}`)
    .then((res) => res.json())
    .then((data) => {setSuggestions(data)});
  } else if (inputText.length === 0 && inputSelected){
    fetchPopular()
  } else {
    setSuggestions([])
  }
}, [inputText, inputSelected]);


const fetchPopular = async () => {
  try {
      const data = await (await fetch(popularDepartureAPI)).json()
      setSuggestions(data)
  } catch (err) {
      console.log(err.message)
  } 
}

const onClickHandler =  () => {
    setInputSelected(true)
}

const onChangHandler = (inputText) => {
  setInputText(inputText)
 }

 const onSuggestHandler = (suggestion) => {
  navigate("/search", {state:{id:1,name:suggestion}});
}

const onBlurHandler =()=>{
  setTimeout(()=>{
    setInputSelected(false)
  },200)
}

  return (
    <div >
    <div className={styles.searchContainer}>
      <input 
      placeholder='Veuillez saisir une Ville de Départ...'
      className={styles.searchInput}
      type="Text"
      value={inputText}
      onChange={e=>onChangHandler(e.target.value)}
      onClick={onClickHandler} 
      onBlur={onBlurHandler}
      />
      <button type="submit" className={styles.searchButton} onClick={()=>onSuggestHandler(inputText)}>
      <FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#FFFFFF",}} />
      </button>
    </div>
    <div className={styles.dropdownContainer}>
    <div className={styles.dropdown}>
    {suggestions.length>0 && <p className={styles.dropdownRowTitle}>Suggestions :</p>}
      {suggestions && suggestions.map((suggestion,i) =>
      <div key={suggestion.unique_name} className={styles.dropdownRow} onClick={()=>onSuggestHandler(suggestion)}><FontAwesomeIcon icon={faTreeCity} style={{color: "#34a853",marginRight:"10px"}} />{suggestion.local_name}</div>
      )}
      </div>
      </div>
     
      </div>
  );
}

export default FirstSearch;
