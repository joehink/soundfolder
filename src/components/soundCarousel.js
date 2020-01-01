import React, { Component } from "react";

import Lottie from 'react-lottie';

import * as alarmClock from '../images/animations/alarm_clock.json';
import * as toaster from '../images/animations/toaster.json';
import * as popcorn from '../images/animations/popcorn.json';

const animations = [alarmClock, toaster, popcorn];

export default class SoundCarousel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            defaultOptions: {
                loop: true,
                autoplay: true, 
                animationData: animations[0].default,
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice'
                }
            },
            animationIndex: 1
        }
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            let { animationIndex, defaultOptions } = this.state;
        
            this.setState({
                animationIndex: animationIndex < 2 ? animationIndex + 1 : 0,
                defaultOptions: {
                    ...defaultOptions,
                    animationData: animations[animationIndex].default
                }
            });
        }, 3000)
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    render() {
        return (
            <div className="animation">
                <Lottie options={this.state.defaultOptions}
                    height={320}
                    width={300}
                    isStopped={false}
                    isPaused={false}
                />
            </div>
            
        )
    }
}