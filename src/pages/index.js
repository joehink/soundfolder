import React, { useRef } from "react"
import { FaChevronDown } from "react-icons/fa";
import Lottie from "react-lottie";

import * as soundAnimation from '../images/animations/sound_animation.json';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/container";
import SoundCard from "../components/soundCard";
import Nav from "../components/nav";
import SearchBar from "../components/searchBar";
// import SoundCarousel from "../components/soundCarousel";

const scrollToRef = (ref) => ref.current.scrollIntoView({ behavior: "smooth" })

export default ({ data }) => {

    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)

    const  { nodes } = data.allSoundsCsv;
    const recentSounds = nodes.slice(nodes.length - 8);

    const soundCards = recentSounds.reverse().map(sound => {
        return <SoundCard sound={sound} key={sound.id} />
    });

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: soundAnimation.default,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

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
                                    {/* <SoundCarousel /> */}
                                    <div style={{ maxWidth: 400, margin: '0 auto' }}>
                                        <Lottie options={defaultOptions}
                                            isStopped={false}
                                            isPaused={false}
                                        />
                                    </div>
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
        allSoundsCsv {
            nodes {
                id
                title
                description
                categories
                file_name
                fields {
                    slug
                }
            }
        }
    }
`
