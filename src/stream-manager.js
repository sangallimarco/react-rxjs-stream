export default class StreamManager {
	
    constructor() {
		this.subs = [];
	}

	add(x) {
		this.subs.push(x);
	}

	dispatch(channel, actions) {
		let actionKeys = Object.keys(actions);
		let dispatcher = channel
			.filter(x => actionKeys.includes(x.id))
			.subscribe(x => {
                // return matching message
				actions[x.id](x);
			});

		this.subs.push(dispatcher);
	}

	destroy() {
		this.subs.map(x => x.unsubscribe());
		this.subs = [];
	}
}