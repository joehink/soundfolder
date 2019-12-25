import React, { Component } from "react";

export default class SoundPlayer extends Component {
    constructor(props) {
        super(props);

        this.audioSeekBar = React.createRef();
        this.togglePlayback = this.togglePlayback.bind(this);
        this.setCurrentTime = this.setCurrentTime.bind(this);

        this.state = {
            currentTime: 0,
            duration: 0,
            isPlaying: false
        };
    }
    componentDidMount() {
        const { src } = this.props;

        this.sound = new Audio(src);

        this.sound.addEventListener("loadeddata", event => {
            this.setState({
                currentTime: event.target.currentTime,
                duration: event.target.duration
            });
        })

        this.sound.addEventListener("timeupdate", event => {
            this.setState({
                currentTime: event.target.currentTime
            })
        });
        
        this.sound.addEventListener("ended", event => {
            this.setState({
                isPlaying: false
            })
        });
    }
    togglePlayback() {
        if (this.state.isPlaying) {
            this.sound.pause()
        } else {
            this.sound.play();
        }

        this.setState({
            isPlaying: !this.state.isPlaying
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
    render() {
        return (
            <div>
                <button onClick={this.togglePlayback}>{this.state.isPlaying ? 'Pause' : 'Play'}</button>
                <div
                    style={{ height: 100, backgroundColor: 'black', position: 'relative' }}
                    onClick={this.setCurrentTime}
                    ref={this.audioSeekBar}
                >
                    <div style={{ position: 'absolute', top: 0, height: '100%', width: '100%', backgroundColor: 'red', transform: `scaleX(${(this.state.currentTime / this.state.duration)})`, transformOrigin: 'left' }}></div>
                    <span style={{ position: 'relative' }}>{this.formatTime(this.state.currentTime)} / {this.formatTime(this.state.duration)}</span>
                </div>
            </div>
        )
    }
}
    