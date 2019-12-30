import React from "react";
import { graphql } from "gatsby";

import Container from "../components/container";
import Footer from "../components/footer";
import Nav from "../components/nav";
import SoundCard from "../components/soundCard";

export default ({ data, pageContext }) => {
    const soundCards = data.allSoundsCsv.nodes.map(sound => {
        return <SoundCard sound={sound} key={sound.id} />
    });

    return (
        <>
            <div id="category">
                <Container>
                    <Nav />

                    <h2>Category: <span className="categoryTitle">{ pageContext.category }</span></h2>

                    <div className="sounds">
                        { soundCards }
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    )
}

export const query = graphql`
    query($categoryRegex: String!) {
        allSoundsCsv(filter: { categories: { regex: $categoryRegex } }, sort: { fields: title }) {
            nodes {
                id
                title
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