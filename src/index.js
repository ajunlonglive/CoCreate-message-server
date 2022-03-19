class CoCreateMessage {
	constructor(wsManager) {
		this.wsManager = wsManager;
		this.init();
	}
	
	init() {
		if (this.wsManager) {
			this.wsManager.on('sendMessage', (socket, data, socketInfo) => this.sendMessage(socket, data, socketInfo));
		}
	}

	/**
	CoCreateSocket.sendMessage({
		namespace: '',
		rooms: [r1, r2],
		emit: {
			message': 'nice game',
			data': 'let's play a game ....'
		}
	})
	**/
	async sendMessage(socket, data, socketInfo) {
		try {
			if (!data.emit) return;
			this.wsManager.broadcast(socket, data.namespace || data['organization_id'], data.rooms, data.emit.message, data, socketInfo);
		} catch (error) {
			console.log('sendMessage Error', error);
		}
	}
}
module.exports = CoCreateMessage;



