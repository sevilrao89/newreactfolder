import axios from "axios";

export default {
  // Gets all books
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the book with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a book to the database
  saveArticle: function(articleData) {
    console.log(articleData)
    return axios.post("/api/articles", articleData);
    
  },
  //nyt call
    nytCall: function(articleData) {
      console.log("making request to our server", articleData)
     return axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=e4a1f8fde5b34bc78199f8e05504ab4f&q=${articleData.searchTerm}`)
  .then(function (response) {
    // handle success
    console.log(response);
    //return {apiData: [{url: "", headline: ""}, {url: "", headline: ""}, {url: "", headline: ""}, {url: "", headline: ""}]}
    const articles = response.data.response.docs
    const newArticles= []
    for(let i = 0; i < articles.length; i++){
      var obj = {}
      obj["headline"] = articles[i].headline.main; 
      obj["url"] = articles[i].web_url;
        newArticles.push(obj)
      
      console.log(newArticles)
    }

    return {apiData:newArticles}

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
    //return axios.post("/api/articles/nyt", articleData);
  }

  
};



