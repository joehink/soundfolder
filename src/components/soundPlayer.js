import React, { Component } from "react";


export default class SoundPlayer extends Component {
    constructor(props) {
        super(props);

        const { src } = props;
        this.sound = new Audio(src);

        this.audioSeekBar = React.createRef();

        this.togglePlayback = this.togglePlayback.bind(this);
        this.setCurrentTime = this.setCurrentTime.bind(this);
        this.initializeAnalyser = this.initializeAnalyser.bind(this);

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
            if (!this.state.hasBeenPlayed) {
                this.initializeAnalyser();
                this.setState({ hasBeenPlayed: true });
            } else {
                this.sound.play();
            }
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
    initializeAnalyser() {
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        const context = new AudioContext();
        this.src = context.createMediaElementSource(this.sound);
        this.analyser = context.createAnalyser();

        const ctx = this.refs.canvas.getContext("2d");

        this.src.connect(this.analyser);
        this.analyser.connect(context.destination);

        this.analyser.fftSize = 256;

        const bufferLength = this.analyser.frequencyBinCount;

        const dataArray = new Uint8Array(bufferLength);

        const WIDTH = this.refs.canvas.width;
        const HEIGHT = this.refs.canvas.height;

        const barWidth = (WIDTH / bufferLength) * 2.5;

        const self = this;

        function renderFrame() {
            const rafId = requestAnimationFrame(renderFrame);

            let x = 0;

            self.analyser.getByteFrequencyData(dataArray);

            ctx.fillStyle = "#FAFAFA";
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            for (let i = 0; i < bufferLength; i++) {
                let barHeight = dataArray[i];
                
                ctx.fillStyle = "#008457";
                ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

                x += barWidth - 2;
            }

            return rafId;
        };

        this.sound.play();
        this.rafId = renderFrame();
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
    componentWillUnmount() {
        cancelAnimationFrame(this.rafId);

        if (this.analyser) {
            this.analyser.disconnect();    
        }
        
        if (this.src) {
            this.src.disconnect();
        }
    }
    render() {
        return (
            <div className="soundPlayer">
                <canvas className="analyser" ref="canvas" height="200"></canvas>
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
                        <div className="progress" style={{ transform: `scaleX(${(this.state.currentTime / this.state.duration)}` }}></div>
                        <span className="time">{this.formatTime(this.state.currentTime)} / {this.formatTime(this.state.duration)}</span>
                    </div>
                </div>
            </div>
        )
    }
}
    