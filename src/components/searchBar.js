import React, { Component } from "react";
import { StaticQuery, graphql, navigate } from "gatsby";
import { FaSearch } from 'react-icons/fa';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            searchTerm: ''
        }
    }
    handleInput(event) {
        this.setState({
            searchTerm: event.target.value
        })
    }
    handleSubmit(event) {
        event.preventDefault();
        
        navigate(`/search?keywords=${this.state.searchTerm}`)
    }
    render() {
        return (
            <StaticQuery
                query={graphql`
                    query {
                        allSoundsCsv {
                            totalCount
                        }
                    }
                `}
                render={data => (
                    <form role="search" method="GET" onSubmit={this.handleSubmit}>
                        <div className="searchBar">
                            <input
                                type="text"
                                onInput={this.handleInput}
                                placeholder={`Search for one of ${data.allSoundsCsv.totalCount} sounds`}
                                name="keywords"
                            />
                            <button><FaSearch /></button>
                        </div>
                    </form>
                )}
            />
        )
    }
}