import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image"

import Container from "../components/container";
import Layout from "../components/layout";
import Nav from "../components/nav";
import SEO from "../components/seo";

export default ({ data }) => {
    return (
        <Layout>
            <SEO title="FAQ" />
            <Container>
                <Nav />
            </Container>
            <Container size="sm">
                <div id="faq">
                    <h2>Why is it free?</h2>
                    <p>
                        Paying for sound effects is a hassle and probably a dealbreaker
                        for a lot of people but free is simple. Maybe down the road, I 
                        will put adds on this website and/or sell sound effect packs 
                        but for now, everything is free. <strong>And you don’t even need to 
                        give me credit!</strong>
                    </p>
                    <h2>Who runs this website?</h2>
                    <div className="whoSection">
                        <Img fluid={data.file.childImageSharp.fluid} className="joe" width="175" height="175" />
                        <p>
                            My name is Joe. That’s me in the photo. I created this website 
                            in January of 2020 and every sound effect you hear was recorded 
                            by me. For a few years, I had been trying to think of a long term 
                            project idea that would combine my interest in web development 
                            and audio engineering. This is it.
                        </p>
                    </div>
                    <h2>How can I contact Joe?</h2>
                    <p>
                        Send an email to <a href="mailto:soundfolder@gmail.com">joe@soundfolder.com</a>. If you’re looking for a specific 
                        sound effect that I don’t already have, let me know and I’ll add it to 
                        my to-do list. As soon as it’s available for download on SoundFolder, 
                        I’ll reply to your email. I have no personal social media accounts and 
                        for now, there are now SoundFolder social media accounts either.
                    </p>
                    <h2>Where can I find the sound I’m looking for?</h2>
                    <p>
                        If SoundFolder doesn’t have the sound you want, there are a 
                        few other places you should check out. Here they are if you 
                        haven’t already discovered them: <a href="freesound.org" traget="_blank">freesound.org</a>, <a href="soundbible.com" traget="_blank">soundbible.com</a>, and <a href="zapsplat.com" traget="_blank">zapsplat.com</a>.
                    </p>
                </div>
            </Container>
        </Layout>
    )
}

export const query = graphql`
    query {
        file(relativePath: { eq: "joe.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 275) {
                    ...GatsbyImageSharpFluid
                }
            }
          }
    }
`
