





import './App.css'; 
import { useState } from "react";
import axios from 'axios';

// const axios = require('axios').default;


function App() {

  const [data, setData] = useState([]);

  const getNews = () => {
    const options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news',
      params: {safeSearch: 'Off', textFormat: 'Raw'},
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '4497f9a390msh3effc83877294bbp104623jsn7ab2abd661ab',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });

  }

  return (
    <div>

      <form onSubmit={getNews}>
        <input type="text" placeholder='Search News' />

        <button type='submit'>Get News</button>
      </form>

    </div>
  );
}

export default App;
