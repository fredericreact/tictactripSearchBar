import { useState, useEffect } from 'react';
const autocompleteAPI = 'https://api.comparatrip.eu/cities/autocomplete/?q=';
const popularDepartureAPI = 'https://api.comparatrip.eu/cities/popular/5';


function App() {
const [inputText,setInputText] = useState('')
const [suggestions, setSuggestions] = useState([])
const [inputSelected,setInputSelected]=useState(false)

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
  setInputText(suggestion)
  setInputSelected(false)
}

const onBlurHandler =()=>{
  setTimeout(()=>{
    setInputSelected(false)
  },200)
}

  return (
    <div >
    <div >
      <input 
      placeholder='Veuillez saisir une Ville de Départ...'
      type="Text"
      value={inputText}
      onChange={e=>onChangHandler(e.target.value)}
      onClick={onClickHandler} 
      onBlur={onBlurHandler}
      />
      <button type="submit"  onClick={()=>onSuggestHandler(inputText)}>Submit</button>
    </div>
    <div>
    <div>
    {suggestions.length>0 && <p>Suggestions :</p>}
      {suggestions && suggestions.map((suggestion,i) =>
      <div key={suggestion.unique_name} onClick={()=>onSuggestHandler(suggestion.local_name)}>{suggestion.local_name}</div>
      )}
      </div>
      </div>
     
      </div>
  );
}

export default App;
