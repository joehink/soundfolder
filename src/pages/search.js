import React, { Component } from 'react';

import muteIcon from "../images/mute.svg";

import Container from "../components/container"; 
import Layout from "../components/layout";
import Nav from "../components/nav";
import SEO from "../components/seo";
import SoundCard from "../components/soundCard";


export default class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: [],
            searchQuery: ''
        }

        this.renderSounds = this.renderSounds.bind(this);
    }
    componentDidMount() {
        const searchQuery = new URLSearchParams(this.props.location.search).get('keywords') || '';

        if (window.__LUNR__) {
            window.__LUNR__.__loaded.then(lunr => {
                const refs = lunr.en.index.search(searchQuery);
                const sounds = refs.map(({ ref }) => lunr.en.store[ref]);
                this.setState({
                    results: sounds,
                    searchQuery
                })
            });
        }
    }
    renderSounds() {
        if (!this.state.searchQuery || !this.state.results.length) {
            return (
                <div className="noResults">
                    <img src={muteIcon} alt="No results" />
                    <h2>0 search results for <span className="searchTerm">"{this.state.searchQuery}"</span></h2>
                </div>
            )
        }
        const soundCards = this.state.results.map(sound => <SoundCard sound={sound} key={sound.id} />)

        return (
            <>
                <h2>{this.state.results.length} search result{ this.state.results.length === 1 ? '' : 's' } for <span className="searchTerm">"{this.state.searchQuery}"</span></h2>
                <div className="sounds">
                    { soundCards }
                </div>
            </>
        )
    }
    render() {
        return (
            <Layout>
                <SEO title="Search" />
                <div id="search">
                    <Container>
                        <Nav />
                        { this.renderSounds() }
                    </Container>
                </div>
            </Layout>
        )
    }
}