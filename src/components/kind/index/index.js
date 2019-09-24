import React from 'react';
import axios from 'axios';
import FullKindList from '../lists/full';

//This component is used to build a 'complete' list, used for calling searches and passing props to the actual list component.

class Kinds extends React.Component {
    constructor(props) {
        super(props);
        const params = new URLSearchParams(window.location.search)
        this.state = {
          kinds: [],
          pager: {},
          pageNumber: params.get('page') || 1,
          sort: params.get('sort') || "kind_name",
          sortdir: params.get('sortdir') || "ASC",
          searchTerm: ""

        }
    }

    componentDidMount = () => {
      this.loadPage();
    }
    componentDidUpdate = () => {
      this.loadPage();
    }

    loadPage = () => {
      const {pageNumber, sort, sortdir, searchTerm} = this.state
      axios
          .get(`http://localhost:4001/api/kinds?page=${pageNumber}&sort=${sort}&sortdir=${sortdir}&search=${searchTerm}`)
          .then(res =>
            this.setState({
              kinds: res.data.pageOfItems,
              pager: res.data.pager
            })
          )
          .catch(err => console.log(err) );


    }

    goToPage = (e) => {
      this.setState({pageNumber: e.target.attributes.page.value})
      this.loadPage()
    }

    toggleSortDir = (e) => {
      this.setState({sortdir: this.state.sortdir === "ASC" ? "DESC" : "ASC"})
      this.loadPage()
    }

    changeSort = (e) => {
      this.setState({ sort: e.target.attributes.sortTerm.value })
      this.loadPage()
    }

    handleChange = (e) => {
      this.setState({searchTerm: e.target.value})
    }



    render() {
        return <div className="container">
            Sort by:
            <button onClick={this.changeSort} sortTerm={"kind_name"} >Alpha</button>
            <button onClick={this.toggleSortDir}>{this.state.sortdir === "ASC" ? "Asc" : "Desc"}</button>
            <input type='text' onChange={this.handleChange} type="text"
              name="search" placeholder="Search"
              value={this.state.searchTerm} />

            <FullKindList kinds={this.state.kinds} />

            { this.state.pager.currentPage && this.state.pager.currentPage > 1 ?
              <span onClick={this.goToPage} page={1} >First</span>
            : "" }

            { this.state.pager.currentPage && this.state.pager.currentPage > 1 ?
                <span onClick={this.goToPage} page={this.state.pager.currentPage - 1} >Previous</span>
              : "" }

            { this.state.pager.pages ? this.state.pager.pages.map(page => <span>
              <span onClick={this.goToPage} page={page} >{page}</span>
            </span>) : "" }

            { this.state.pager.currentPage && this.state.pager.currentPage < this.state.pager.totalPages ?
              <span onClick={this.goToPage} page={this.state.pager.currentPage + 1} >Next</span>
            : "" }

            { this.state.pager.currentPage && this.state.pager.currentPage < this.state.pager.totalPages ?
              <span onClick={this.goToPage} page={this.state.pager.totalPages} >Last</span>
            : "" }

        </div>
    }
}


export default Kinds;
