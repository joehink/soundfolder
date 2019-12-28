import React from "react";
import { graphql } from "gatsby";

import Container from "../components/container";
import Nav from "../components/nav";

export default ({ data, pageContext }) => {
    return (
        <div>
            <Container>
                <Nav />
                Hey, Dude.
                { pageContext.category }
            </Container>
        </div>
    )
}

export const query = graphql`
    query($categoryRegex: String!) {
        allSoundsCsv(filter: { categories: { regex: $categoryRegex } }) {
            nodes {
                title
                categories
                mp3
                wav
            }
        }
    }
`