import React, { useRef } from "react"
import { FaChevronDown } from "react-icons/fa";

import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/container";
import SoundCard from "../components/soundCard";
import Nav from "../components/nav";
import SearchBar from "../components/searchBar";
import SoundCarousel from "../components/soundCarousel";

const scrollToRef = (ref) => ref.current.scrollIntoView({ behavior: "smooth" })

export default ({ data }) => {

    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)

    const soundCards = data.allSoundsCsv.nodes.map(sound => {
        return <SoundCard sound={sound} key={sound.id} />
    });

    return (
        <Layout>
            <SEO title="Free Sound Effects" />
            <div id="index">
                <header className="hero">
                    <Container>
                        <div className="heroContainer">
                            <Nav white search={false} />
                            <div className="heroContent">
                                <div style={{ width: '100%' }}>
                                    <SoundCarousel />
                                    <SearchBar />
                                    <h2>Totally free sound effects. No attribution required.</h2>
                                </div>
                            </div>
                            <button className="recent" onClick={executeScroll}>
                                <i><FaChevronDown /></i>Recently added
                            </button>
                        </div>
                    </Container>
                </header>
                <Container>
                    <h2 ref={myRef} className="recentHeading">Recently added</h2>
                    <div className="sounds">
                        { soundCards }
                    </div>
                </Container>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query {
        allSoundsCsv(sort: { fields: id, order: DESC }, limit: 8) {
            nodes {
                id
                title
                description
                categories
                mp3
                wav
                fields {
                    slug
                }
            }
        }
    }
`
