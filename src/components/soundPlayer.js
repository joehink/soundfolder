import React, { Component } from "react";
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
    togglePlayback() {
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
    componentDidMount() {
        this.wavesurfer = WaveSurfer.create({
            container: `#waveform-${this.props.id}`,
            height: this.props.height || 128,
            waveColor: '#ccc',
            progressColor: '#008457',
            cursorColor: '#008457',
            cursorWidth: 2,
            responsive: true,
            normalize: true,
            hideScrollbar: true
            // barWidth: 4,
            // barHeight: 2,
            // barRadius: 4,
        });

        this.wavesurfer.load(this.props.src);

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
                    >
                        <i className={`fa ${this.state.isPlaying ? 'fa-pause' : 'fa-play'}`} aria-hidden="true"></i>
                    </button>
                    <div id={`waveform-${this.props.id}`} className="waveform"></div>
                </div>
                {/* <span className="time">{this.formatTime(Math.floor(this.state.currentTime))} / { this.formatTime(Math.floor(this.state.duration)) }</span> */}
            </div>
        )
    }
}
    