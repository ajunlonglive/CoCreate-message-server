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
		emit: {
			message': 'nice game',
			data': 'let's play a game ....'
		}
	})
	**/
	async sendMessage(socket, data, roomInfo) {
		try {
			const req_data = data;
			if (!req_data.emit) {
				return ;
			}
			
			const self = this;
			const emit = req_data.emit;
			self.wsManager.broadcast(socket, req_data.namespace || data['organization_id'], req_data.rooms, emit.message, emit.data);
			
		} catch (error) {
			console.log('sendMessage Error', error);
		}
	}
}
module.exports = CoCreateMessage;



