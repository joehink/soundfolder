import React from "react"

import Hero from "../components/hero";
import Layout from "../components/layout"
import SEO from "../components/seo"
import Container from "../components/container";
import SoundCard from "../components/soundCard";

export default ({ data }) => {

    const soundCards = data.allSoundsCsv.nodes.map(sound => {
        return <SoundCard sound={sound} key={sound.id} />
    });

    return (
        <Layout>
            <SEO title="Home" />
            <div id="index">
                <Hero />
                <Container>
                    <h2 className="recentHeading">Recently added</h2>
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
