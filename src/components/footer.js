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
            .slice(0, 12)
            .map(category => {
                return <li key={category}><Link to={`/${category}`} className="link">{ category }</Link></li>
            })

            return (
                <footer className="footer">
                    <Container>
                        <div className="contact section">
                            <img src={logoWhite} alt="Sound Folder logo" className="logo" />
                            <h4>We curate and create sound effects for you</h4>
                            <a href="mailto:soundfolder@gmail.com" className="email">soundfolder@gmail.com</a>
                            <span className="copyright">Joe Hinkley © 2019</span>
                        </div>
                        <div className="categories section">
                            <h2>Categories</h2>
                            <ul>
                                { categories }
                            </ul>
                        </div>
                        <div className="faq section">
                            <h2>Where do these sounds come from?</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                sed do eiusmod tempor incididunt ut labore et dolore magna 
                                aliqua. Learn more by visiting our <Link to="/faq">FAQ page</Link>.
                            </p>
                        </div>
                    </Container>
                </footer>
            )
        }}
    />
)