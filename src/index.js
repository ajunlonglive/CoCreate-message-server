class CoCreateMessage {
	constructor(wsManager) {
		this.wsManager = wsManager;
		this.init();
	}
	
	init() {
		if (this.wsManager) {
			this.wsManager.on('sendMessage', (socket, data) => this.sendMessage(socket, data));
		}
	}

	/**
	CoCreateSocket.sendMessage({
		namespace: '',
		rooms: [r1, r2],
		message': 'nice game',
		data': 'let's play a game ....'
	})
	**/
	async sendMessage(socket, data) {
		try {
			if (!data.data) return;
			this.wsManager.broadcast(socket, data.message, data);
		} catch (error) {
			console.log('sendMessage Error', error);
		}
	}
}
module.exports = CoCreateMessage;



