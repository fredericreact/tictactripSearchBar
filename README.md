# 1. Create React App

### This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts in the project directory :

<br />

### Run the app in the development mode
```javascript
npm start
```
### Build the app for production
```javascript
npm run build
```


# 2. Packages installed

### Fontawesome

```javascript
npm i --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
```

### React Router

```javascript
npm install react-router-dom
```

# 3. Content of this project :

## A Departure/Arrival Search Bar with autocomplete fetching APIs

<br/>

# 4. 3 APIs used

1. If the input field is emtpy : Fetch Top 5 popular destinations
2. If the input field is not empty : Fetch destinations based on input value
3. If the the departure is selected and the arrival is empty : Fetch Top destinations for the departure selected

# 5. Search bar events :

Searchbars have the following events below : 

When there is : 
1. a click on the input field : fetch suggestions
2. a keystroke on the input field : fetch suggestions 
3. a click outside of the input field : hide suggestions
4. a click on an autocomplete suggestion : redirect to Second Search component
5. a click on the swap button : Departure input value and Arrival input value are swapped

# 4. Styling

### CSS module