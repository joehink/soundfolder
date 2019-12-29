import React, { Component } from "react";
import { graphql } from "gatsby";

import Container from "../components/container";
import DownloadLink from "../components/downloadLink";
import Nav from "../components/nav";
import SoundCard from "../components/soundCard";
import SoundPlayer from "../components/soundPlayer";
import Tag from "../components/tag";

export default class Sound extends Component {
    constructor(props) {
        super(props);

        this.renderTags = this.renderTags.bind(this);
        this.renderRelatedSounds = this.renderRelatedSounds.bind(this);
    }
    renderTags() {
        const sound = this.props.data.sound;

        return sound.categories.split(',').map(category => {
            return <Tag to={`/${category}`} key={category}>{ category }</Tag>
        })
    }
    renderRelatedSounds() {
        const { relatedSounds, otherSoundsInCategory } = this.props.data;

        const categorySounds = otherSoundsInCategory.nodes
            .filter(soundA => relatedSounds.nodes.every(soundB => soundB.id !== soundA.id));

        const allRelatedSounds = [...relatedSounds.nodes, ...categorySounds].slice(0, 8);

        return allRelatedSounds.map(sound => {
            return <SoundCard sound={sound} key={sound.id} />
        });
    }
    render() {
        const sound = this.props.data.sound;

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
                <Container>
                    <h2>Related sounds</h2>
                    <div className="sounds">
                        { this.renderRelatedSounds() }
                    </div>
                </Container>
            </div>
        )
    }
}

export const query = graphql`
query($slug: String!, $relatedTitle: String!, $relatedCategory: String!) {
    sound: soundsCsv(fields: { slug: {eq: $slug } }) {
        title
        description
        categories
        mp3
        wav
    },
    relatedSounds: allSoundsCsv(filter: { title: { regex: $relatedTitle }, categories: { regex: $relatedCategory }, fields: { slug: { ne: $slug } } }, limit: 8) {
        nodes {
            id
            title
            description
            categories
            mp3
            wav
            fields {
                slug
            }
        }
    }
    otherSoundsInCategory: allSoundsCsv(filter: { categories: { regex: $relatedCategory }, fields: { slug: { ne: $slug } } }, limit: 8) {
        nodes {
            id
            title
            description
            categories
            mp3
            wav
            fields {
                slug
            }
        }
    }
}
`
