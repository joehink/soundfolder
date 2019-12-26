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

            ctx.fillStyle = "#FFF";
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            for (let i = 0; i < bufferLength; i++) {
                let barHeight = dataArray[i];
                
                ctx.fillStyle = "red";
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
        this.analyser.disconnect();
        this.src.disconnect();
    }
    render() {
        return (
            <div>
                <canvas ref="canvas" width="700" height="300"></canvas>
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
    