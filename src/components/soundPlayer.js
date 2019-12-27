import React, { Component } from "react";


export default class SoundPlayer extends Component {
    constructor(props) {
        super(props);

        const { src } = props;
        this.sound = new Audio(src);

        this.audioSeekBar = React.createRef();

        this.togglePlayback = this.togglePlayback.bind(this);
        this.setCurrentTime = this.setCurrentTime.bind(this);

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
            this.sound.pause();
        } else {
            this.sound.play();
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
    setCurrentTime(event) {
        const seekBar = this.audioSeekBar.current;

        const pos = (event.pageX - (seekBar.getBoundingClientRect().x || seekBar.getBoundingClientRect().left)) / seekBar.getClientRects()[0].width;

        this.sound.currentTime = this.state.duration * pos;

        this.setState({
            currentTime: this.state.duration * pos
        });
    }
    componentDidMount() {
        this.sound.addEventListener("loadeddata", event => {
            this.setState({
                currentTime: event.target.currentTime,
                duration: event.target.duration,
                isLoaded: true
            });
        })

        this.sound.addEventListener("timeupdate", event => {
            this.setState({
                currentTime: event.target.currentTime
            });
        });
        
        this.sound.addEventListener("ended", event => {
            this.setState({
                isPlaying: false
            });
        });
    }
    render() {
        return (
            <div className="soundPlayer">
                <div className="player">
                    <button 
                        onClick={this.togglePlayback}
                        className="play"
                    >
                        <i className={`fa ${this.state.isPlaying ? 'fa-pause' : 'fa-play'}`} aria-hidden="true"></i>
                    </button>
                    <div
                        className="seekBar"
                        onClick={this.setCurrentTime}
                        ref={this.audioSeekBar}
                    >
                        <div className="progress" style={{ transform: `scaleX(${!this.state.hasBeenPlayed ? 0 : (this.state.currentTime / this.state.duration)}` }}></div>
                        <span className="time">{this.formatTime(this.state.currentTime)} / {this.formatTime(this.state.duration)}</span>
                    </div>
                </div>
            </div>
        )
    }
}
    