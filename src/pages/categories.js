import React from "react";
import { Link, graphql } from "gatsby";

export default ({ data }) => {

    const categories = data.allSoundsCsv.nodes
        .flatMap(sound => sound.categories.split(','))
        .reduce((uniqueCategories, category) => 
            uniqueCategories.includes(category) ? uniqueCategories : [...uniqueCategories, category], [])
        .map(category => {
            return <Link to={`/${category}`} key={category}>{ category }</Link>
        })


    return (
        <div>
            { categories }
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