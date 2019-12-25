import React, { Component } from "react";
import moment from "moment";

export default class SoundPlayer extends Component {
    constructor(props) {
        super(props);

        this.playSound = this.playSound.bind(this);

        this.state = {
            currentTime: 0,
            duration: 0
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
                currentTime: event.target.currentTime,
                duration: event.target.duration
            })
        });

        
    }
    playSound() {
        this.sound.play();
    }
    formatTime(totalSeconds) {
        let seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);

        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        return `${minutes}:${seconds}`
    }
    render() {
        return (
            <div>
                <button onClick={this.playSound}>Play</button>
                {this.formatTime(this.state.currentTime)} / {this.formatTime(this.state.duration)}
            </div>
        )
    }
}
    