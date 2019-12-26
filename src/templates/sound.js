import React from "react";
import { graphql } from "gatsby";

import Container from "../components/container";
import SoundPlayer from "../components/soundPlayer";

export default ({ data }) => {
    const sound = data.allSoundsCsv.nodes[0];
    return (
        <Container size="sm">
            <SoundPlayer src={sound.mp3} />
            <a href={sound.mp3} download>MP3</a>
            <a href={sound.wav} download>WAV</a>
        </Container>
    );
}

export const query = graphql`
query($slug: String!) {
    allSoundsCsv(filter: { fields: { slug: { eq: $slug } } }) {
        nodes {
            title
            description
            categories
            mp3
            wav
        }
    }
}
`
