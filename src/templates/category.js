import React from "react";
import { graphql } from "gatsby";

export default ({ data, pageContext }) => {
    return (
        <div>
            Hey, Dude.
            { pageContext.category }
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