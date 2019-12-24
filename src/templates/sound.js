import React from "react";
import { graphql } from "gatsby";

export default ({ data }) => {
    const sound = data.allSoundsCsv.nodes[0];
    return (
        <div>
            Hey, Dude.
            <audio controls>
                <source src={sound.mp3} type="audio/mpeg" />
                Your browser does not support the audio tag.
            </audio>
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
            wav
        }
    }
}
`
