import React, { Component } from "react";
import { StaticQuery, graphql } from "gatsby";
import { FaSearch } from 'react-icons/fa';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.handleInput = this.handleInput.bind(this);

        this.state = {
            searchTerm: ''
        }
    }
    handleInput(event) {
        this.setState({
            searchTerm: event.target.value
        })
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
                    <form>
                        <div className="searchBar">
                            <input type="text" onInput={this.handleInput} placeholder={`Search for one of ${data.allSoundsCsv.totalCount} sounds`} />
                            <button><FaSearch /></button>
                        </div>
                    </form>
                )}
            />
        )
    }
}