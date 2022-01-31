import React, { Component } from 'react';
import axios from 'axios';
import StockCard from "../StockCard/index";
const Landing = () => (<Search />);

class Search extends Component {
  state = {
    keyword: '',
    loaded: false,
    isloading: false,
    data: []
  }

  fetchInfo = () => {
    axios.get(`/api/live/${this.state.keyword}`)
      .then(res => {
        const data = res.data
        this.setState({
          loaded: true,
          isloading: false,
          data: data
        })
      })
  }


  handleInputChange = () => {
    this.setState({
      keyword: this.search.value
    })
  }

  handleOnSubmit = (event) => {
    this.setState({
      isloading: true
    })
    console.log(this.state.keyword)
    this.fetchInfo()
    event.preventDefault()
  }

  render() {
    console.log(this.state)
    const { isloading, loaded, data } = this.state;
    const renderCards = () => (
      loaded && data.map((ticker, index) =>
        <StockCard key={index} data={ticker} />)
    )
    return (
      <div className={"searchPage m-top-5"}>
        <h4 className={"centr m-top-50"}>Browse Stocks</h4>
        <form className={"search"} onSubmit={this.handleOnSubmit}>
          <input
            className={"searchTerm"}
            placeholder="search..."
            ref={input => this.search = input}
            onChange={this.handleInputChange}
          />
        </form>
        <div className={"card-result-area"}>
          {isloading ? <div className={"lds-circle centr"}><div></div></div> : renderCards()}
        </div>
      </div>
    )
  }
}
export default Landing;
