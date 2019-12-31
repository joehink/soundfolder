import React, { useRef } from "react"
import { FaChevronDown } from "react-icons/fa";

import bomb from "../images/bomb_1.svg";

import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/container";
import SoundCard from "../components/soundCard";
import Nav from "../components/nav";
import SearchBar from "../components/searchBar";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)   

export default ({ data }) => {

    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)

    const soundCards = data.allSoundsCsv.nodes.map(sound => {
        return <SoundCard sound={sound} key={sound.id} />
    });

    return (
        <Layout>
            <SEO title="Home" />
            <div id="index">
                <header className="hero">
                    <Container>
                        <Nav white />
                        <img src={bomb} alt="placeholder" className="heroImg" />
                        <SearchBar />
                        <h2>Totally free sound effects. No attribution required.</h2>
                        <button className="recent" onClick={executeScroll}>
                            <i><FaChevronDown /></i>Recently added
                        </button>
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
