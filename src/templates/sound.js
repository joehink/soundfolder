import React, { Component } from "react";
import { graphql } from "gatsby";

import Container from "../components/container";
import DownloadLink from "../components/downloadLink";
import Nav from "../components/nav";
import SoundPlayer from "../components/soundPlayer";
import Tag from "../components/tag";

export default class Sound extends Component {
    constructor(props) {
        super(props);

        this.renderTags = this.renderTags.bind(this);
    }
    renderTags() {
        const sound = this.props.data.allSoundsCsv.nodes[0];

        return sound.categories.split(',').map(category => {
            return <Tag to={`/${category}`} key={category}>{ category }</Tag>
        })
    }
    render() {
        const sound = this.props.data.allSoundsCsv.nodes[0];
        return (
            <div id="sound">
                <Container>
                    <Nav />
                </Container>
                <Container size="sm">
                    <h1>{ sound.title }</h1>
                    { this.renderTags() }
                    <SoundPlayer src={sound.mp3} id={sound.id} />
                    <p className="description">{ sound.description }</p>
                    <DownloadLink href={sound.wav}>WAV</DownloadLink>
                    <DownloadLink href={sound.mp3} mp3={true}>MP3</DownloadLink>
                </Container>
            </div>
        )
    }
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
