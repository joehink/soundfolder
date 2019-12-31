import React, { useState, useEffect } from 'react';

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
    }, []);
    
    const soundCards = results.map(sound => <SoundCard sound={sound} key={sound.id} />)
    return (
        <Layout>
            <SEO title="Search" />
            <div id="search">
                <Container>
                    <Nav />
                    <h2>{results.length} search result{ results.length === 1 ? '' : 's' } for <span className="searchTerm">"{searchQuery}"</span></h2>
                    <div className="sounds">
                        { soundCards }
                    </div>
                </Container>
            </div>
            
        </Layout>
    )
}