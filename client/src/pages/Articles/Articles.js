import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import DeleteBtn from "../../components/DeleteBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import SaveBtn from "../../components/SaveBtn";

class Articles extends Component {
  state = {
    articles: [],
    nytArticles: [],
    headline: "",
    keyword: "",
    url: "",

  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res => this.setState({ articles: res.data, headline: "", url: "" }))
      .catch(err => console.log(err));
  };

  loadNytArticles = (res) => {
    console.log(res)
  this.setState({ nytArticles: res.apiData, keyword: ""})

  }


  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if(this.state.keyword){
      API.nytCall({
        searchTerm: this.state.keyword
       
      })
      .then(res => this.loadNytArticles(res))
      .catch(err => console.log(err));
    }
    // if (this.state.title && this.state.url) {
    //   API.saveArticle({
    //     title: this.state.title,
    //     url: this.state.url,
    //   })
    //     .then(res => this.loadArticles())
    //     .catch(err => console.log(err));
    // }
  };
    

  saveArticle = articleOBJ => {
    console.log("this is my article", articleOBJ)
    API.saveArticle(articleOBJ)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Articles Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.keyword}
                onChange={this.handleInputChange}
                name="keyword"
                placeholder="searchTerm (required)"
              />
            
              <FormBtn
                disabled={!(this.state.keyword)}
                onClick={this.handleFormSubmit}
              >
                Submit Search
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Articles On My List</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(articles => {
                  return (
                    <ListItem key={articles._id}>
                      <a href={articles.url}>
                        <strong>
                          {articles.headline} 
                        </strong>
                      </a>
                      <DeleteBtn onClick={() => this.deleteArticle(articles._id)} />
                    </ListItem>
                  );
                })}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
        <Row>
        <Col size="md-6 sm-12">

             <List>
                {this.state.nytArticles.map(nytArticle => {
                  return (
                    <ListItem>
                      <a href={nytArticle.url}>
                        <strong>
                          {nytArticle.headline}
                        </strong>
                      </a>
                      <SaveBtn onClick={() => this.saveArticle(nytArticle)}/>
                    </ListItem>
                  );
                })}
              </List>
          </Col>
         </Row> 
      </Container>
    );
  }
}

export default Articles;
