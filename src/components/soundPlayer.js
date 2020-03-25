import React, { Component } from "react";
import axios from 'axios';
import { FaPlay, FaPause } from 'react-icons/fa';
import WaveSurfer from 'wavesurfer.js';


export default class SoundPlayer extends Component {
    constructor(props) {
        super(props);

        this.togglePlayback = this.togglePlayback.bind(this);

        this.state = {
            currentTime: 0,
            duration: 0,
            isPlaying: false,
            isLoaded: false,
            hasBeenPlayed: false
        };
    }
    togglePlayback(e) {
        e.stopPropagation();
        
        if (this.state.isPlaying) {
            this.wavesurfer.pause();
        } else {
            this.wavesurfer.play();

            const playButtons = document.querySelectorAll(`.soundPlayer.isPlaying .play`);
            playButtons.forEach(button => button.click())
        }

        this.setState({
            isPlaying: !this.state.isPlaying,
            hasBeenPlayed: true
        });
    }
    formatTime(totalSeconds) {
        let seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`
    }
    async componentDidMount() {
        this.wavesurfer = WaveSurfer.create({
            backend: 'MediaElement',
            container: `#waveform-${this.props.id}`,
            height: this.props.height || 128,
            waveColor: '#ccc',
            progressColor: '#008457',
            cursorColor: '#008457',
            cursorWidth: 2,
            responsive: true,
            normalize: true,
            hideScrollbar: true,
            pixelRatio: 1,
            partialRender: true
        });

        try {
            const res = await axios.get(`/sound/waveforms/${this.props.fileName}.json`);
            this.wavesurfer.load(this.props.src, res.data.data, 'none');

            this.wavesurfer.on("ready", () => {
                const currentTime = this.wavesurfer.getCurrentTime();
                const duration = this.wavesurfer.getDuration();

                this.setState({
                    currentTime,
                    duration,
                    isLoaded: true
                });
            })
            
            this.wavesurfer.on("audioprocess", () => {
                const currentTime = this.wavesurfer.getCurrentTime();

                this.setState({
                    currentTime
                });
            })

            this.wavesurfer.on("finish", () => {
                this.setState({
                    isPlaying: false
                });
            });
        } catch (error) {
            console.error(error);
        }
    }
    componentWillUnmount() {
        this.wavesurfer.destroy();
    }
    render() {
        return (
            <div className={`soundPlayer ${this.state.isPlaying ? 'isPlaying' : ''}`}>
                <div className="player">
                    <button 
                        onClick={this.togglePlayback}
                        className="play"
                        aria-label={ this.state.isPlaying ? "Pause" : "Play" }
                    >
                        { this.state.isPlaying ? <FaPause /> : <FaPlay /> }
                    </button>
                    <div 
                        id={`waveform-${this.props.id}`}
                        className="waveform"
                        onClick={(e) => e.stopPropagation()}
                        role="button"
                        aria-label="Scan sound effect timeline"
                        tabIndex="0"
                        onKeyDown={(e) => e.stopPropagation()}
                    ></div>
                </div>
                {/* <span className="time">{this.formatTime(Math.floor(this.state.currentTime))} / { this.formatTime(Math.floor(this.state.duration)) }</span> */}
            </div>
        )
    }
}
