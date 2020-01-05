import React from "react";
import { useStaticQuery, Link, graphql } from "gatsby";

import logoWhite from "../images/logo-white.png";

import Container from "./container";

export default () => {
    const data = useStaticQuery(graphql`
        query {
            allSoundsCsv {
                nodes {
                    categories
                }
            }
        }
    `)

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
                    <a href="mailto:joe@soundfolder.com" className="email">joe@soundfolder.com</a>
                    <span className="copyright">SoundFolder © 2020</span>
                </div>
                <div className="categories section">
                    <h2>Categories</h2>
                    <ul>
                        { categories }
                    </ul>
                </div>
                <div className="faq section">
                    <h2>Why is it free?</h2>
                    <p>
                        Paying for sound effects is a hassle and probably a dealbreaker 
                        for a lot of people but free is simple and you don’t even need to give 
                        credit to the author! Learn more by visiting 
                        our <Link to="/faq" className="faqLink">FAQ page</Link>.
                    </p>
                </div>
            </Container>
        </footer>
    )
}