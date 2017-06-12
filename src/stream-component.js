import { Component } from 'react';
import StreamManager from './stream-manager';

export default class StreamComponent extends Component {

	constructor(props) {
		super(props);
		// this holds stream constant
		this.streams = props.streams;
		// this is the stream manager
		this.streamManager = new StreamManager();
	}

	componentWillUnmount() {
		this.streamManager.destroy();
	}
}