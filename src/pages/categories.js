import React from "react";
import { Link, graphql } from "gatsby";

import Container from "../components/container";
import Footer from "../components/footer";
import Nav from "../components/nav";

export default ({ data }) => {

    const categories = data.allSoundsCsv.nodes
        .flatMap(sound => sound.categories.split(','))
        .reduce((uniqueCategories, category) => 
            uniqueCategories.includes(category) ? uniqueCategories : [...uniqueCategories, category], [])
        .sort()
        .map(category => {
            return <li key={category}><Link to={`/${category}`} className="link">{ category }</Link></li>
        })


    return (
        <div id="categories">
            <Container>
                <Nav />
                <h2>{ categories.length } categories</h2>
                <ul className="categoryList">
                    { categories }
                </ul>
            </Container>
            <Footer />
        </div>
    )
}


export const query = graphql`
        query {
            allSoundsCsv {
                nodes {
                    categories
                }
            }
        }
    `;