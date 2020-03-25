import React, { Component } from "react";
import { navigate, Link } from "gatsby";

import DownloadLink from "../components/downloadLink";
import SoundPlayer from "../components/soundPlayer";
import Tag from "../components/tag";

export default class SoundCard extends Component {
    render() {
        const { sound } = this.props;

        const tags = sound.categories.split(',').map(category => {
            return <Tag key={category} to={`/${category}`}>{ category }</Tag>
        })

        const goToSound = () => navigate(sound.fields.slug)

        return (
            <div 
                className="soundCard"
                onClick={goToSound}
                role="link"
                tabIndex="0"
                onKeyDown={goToSound}
            >
                <Link to={sound.fields.slug}><h3>{ sound.title }</h3></Link>
                <div className="tags">
                    { tags }
                </div>
                <SoundPlayer src={`/sound/mp3/${sound.file_name}.mp3`} fileName={sound.file_name} id={sound.id} height={72}/>
                <DownloadLink href={`/sound/wav/${sound.file_name}.wav`}>WAV</DownloadLink>
                <DownloadLink href={`/sound/mp3/${sound.file_name}.mp3`} mp3={true}>MP3</DownloadLink>
            </div>
        );
    }
}