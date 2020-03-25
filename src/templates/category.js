import React from "react";
import { graphql } from "gatsby";

import Container from "../components/container";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Nav from "../components/nav";
import SoundCard from "../components/soundCard";

export default ({ data, pageContext }) => {
    const { category } = pageContext;
    const soundCards = data.allSoundsCsv.nodes.map(sound => {
        return <SoundCard sound={sound} key={sound.id} />
    });

    return (
        <Layout>
            <SEO title={category.charAt(0).toUpperCase() + category.slice(1)}/>
            <div id="category">
                <Container>
                    <Nav />
                    <h2>Category: <span className="categoryTitle">{ category }</span></h2>

                    <div className="sounds">
                        { soundCards }
                    </div>
                </Container>
            </div>
        </Layout>
    )
}

export const query = graphql`
    query($categoryRegex: String!) {
        allSoundsCsv(filter: { categories: { regex: $categoryRegex } }, sort: { fields: title }) {
            nodes {
                id
                title
                categories
                file_name
                fields {
                    slug
                }
            }
        }
    }
`