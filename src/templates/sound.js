import React from "react";
import { graphql } from "gatsby";

import SoundPlayer from "../components/soundPlayer";

export default ({ data }) => {
    const sound = data.allSoundsCsv.nodes[0];
    return (
        <div>
            <SoundPlayer src={sound.mp3} />
            <a href={sound.mp3} download>MP3</a>
            <a href={sound.wav} download>WAV</a>
        </div>
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
