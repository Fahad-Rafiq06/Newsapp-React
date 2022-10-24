import './App.css'; 
import { useState,useEffect } from "react";
import axios from 'axios';
import moment from 'moment'

// const axios = require('axios').default;


function App() {
 
  const [data, setData] = useState([]);
  const [news, setNews] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=> {

    function getTrendingNews(){
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
      
      axios.request(options).then(function (response) {
        console.log(response.data);

        setData(response.data.value)
      }).catch(function (error) {
        console.error(error);
      });
    }
    getTrendingNews();

  }, [])

  const getNews = (e) => {

    e.preventDefault();

    const options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: {q: news, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off'},
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '4497f9a390msh3effc83877294bbp104623jsn7ab2abd661ab',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };
    setIsLoading(true)
    axios.request(options).then(function (response) {
      setIsLoading(false)
      console.log(response.data.value);

setData(response.data.value)

    }).catch(function (error) {
      setIsLoading(false)
      console.error(error);
    });
  }

return(
  <div>
    <form onSubmit={getNews} >
      <input type="text" placeholder='enter news'
      onChange={(e) =>{
        setNews(e.target.value)
      }} />

      <button type='submit'>Get News</button>
    
    </form>

<div>
  {(isLoading) ? "Loading..." : ""}
  {data.map(eachPost => (
  <div className='post' key={eachPost?.name}>
    <a className="title" href={eachPost?.url} target="_blank"> {eachPost?.name}</a>
    <span>{moment(eachPost?.datePublished).format('Do MMMM, h:mm a')}</span>
    <h3>{eachPost?.description}</h3>
    <img src={eachPost?.image?.thumbnail?.contentUrl
    .replace("&pid=News", "")
    .replace("pid=News&", "")
    .replace("pid=News", "") } alt="" />


  </div>
  ))}


  </div>

  </div>
)
}
export default App;