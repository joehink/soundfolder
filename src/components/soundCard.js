import React, { Component } from "react";
import { Link } from "gatsby";

import DownloadLink from "../components/downloadLink";
import SoundPlayer from "../components/soundPlayer";
import Tag from "../components/tag";

export default class SoundCard extends Component {
    render() {
        const { sound } = this.props;

        const tags = sound.categories.split(',').map(category => {
            return <Tag key={category} to={`/${category}`}>{ category }</Tag>
        })

        return (
            <div className="soundCard">
                <Link to={this.props.sound.fields.slug} className="soundLink"><h3>{ sound.title }</h3></Link>
                <div className="tags">
                    { tags }
                </div>
                <SoundPlayer src={sound.mp3} id={sound.id} height={72}/>
                <DownloadLink href={sound.wav}>WAV</DownloadLink>
                <DownloadLink href={sound.mp3} mp3={true}>MP3</DownloadLink>
            </div>
        );
    }
}