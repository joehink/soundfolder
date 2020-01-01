import React, { useEffect, useState } from 'react';

import muteIcon from "../images/mute.svg";

import Container from "../components/container"; 
import Layout from "../components/layout";
import Nav from "../components/nav";
import SEO from "../components/seo";
import SoundCard from "../components/soundCard";

export default ({ location }) => {
    const [results, setResults] = useState([]);
    const searchQuery = new URLSearchParams(location.search).get('keywords') || '';


    useEffect(() => {
        if (window.__LUNR__) {
            window.__LUNR__.__loaded.then(lunr => {
                const refs = lunr.en.index.search(searchQuery);
                const sounds = refs.map(({ ref }) => lunr.en.store[ref]);
                setResults(sounds);
            });
        }
    }, [searchQuery, location.search])

    const renderSounds = () => {
        if (!searchQuery || !results.length) {
            return (
                <div className="noResults">
                    <img src={muteIcon} alt="No results" />
                    <h2>0 search results for <span className="searchTerm">"{searchQuery}"</span></h2>
                </div>
            )
        }

        const soundCards = results.map(sound => <SoundCard sound={sound} key={sound.id} />)
        return (
            <>
                <h2>{results.length} search result{ results.length === 1 ? '' : 's' } for <span className="searchTerm">"{searchQuery}"</span></h2>
                <div className="sounds">
                    { soundCards }
                </div>
            </>
        )
    }

    return (
        <Layout>
            <SEO title="Search" />
            <div id="search">
                <Container>
                    <Nav searchTerm={searchQuery} />
                    { renderSounds() }
                </Container>
            </div>
        </Layout> 
    )
}
