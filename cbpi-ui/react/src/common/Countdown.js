import React, {Component} from "react";

export default class Countdown extends Component {

    constructor(props) {
        super(props);
        this.state = {seconds: 0};
    }

    initTimer(end) {
        let timer = Math.round((end - Date.now()) / 1000)

        if (timer <= 0) {
            timer = 0
            this.setState({seconds: timer});
            return;
        }
        this.setState({seconds: timer});
        this.interval = setInterval(this.tick.bind(this), 1000);
    }

    componentDidMount() {
        this.initTimer(this.props.end)
    }

    componentWillReceiveProps(nextProps) {
        clearInterval(this.interval);
        this.initTimer(nextProps.end)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        this.setState({seconds: this.state.seconds - 1});
        if (this.state.seconds <= 0) {
            clearInterval(this.interval);
            this.props.onFinish ? this.props.onFinish() : undefined

        }
    }

    format() {

        let totalSeconds = this.state.seconds

        if (this.props.format) {
            return this.props.format(totalSeconds);
        }

        let seconds = parseInt(totalSeconds % 60, 10);
        let minutes = parseInt(totalSeconds / 60, 10) % 60;
        let hours = parseInt(totalSeconds / 3600, 10);

        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        hours = hours < 10 ? '0' + hours : hours;

        return hours + ":" + minutes + ":" + seconds
    }

    render() {
        return (
            <span>{this.format()}</span>
        );
    }

}