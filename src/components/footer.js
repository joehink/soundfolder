import React from "react";
import { StaticQuery, Link, graphql } from "gatsby";

import logoWhite from "../images/logo-white.svg";

import Container from "./container";

export default () => (
    <StaticQuery
        query={graphql`
            query {
                allSoundsCsv {
                    nodes {
                        categories
                    }
                }
            }
        `}
        render={data => {
            const categories = data.allSoundsCsv.nodes
            .flatMap(sound => sound.categories.split(','))
            .reduce((uniqueCategories, category) => 
                uniqueCategories.includes(category) ? uniqueCategories : [...uniqueCategories, category], [])
            .sort()
            .map(category => {
                return <li key={category}><Link to={`/${category}`} className="link">{ category }</Link></li>
            })

            return (
                <footer className="footer">
                    <Container>
                        <img src={logoWhite} alt="Sound Folder logo" />
                    </Container>
                </footer>
            )
        }}
    />
)