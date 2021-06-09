
const {ObjectID, Binary} = require("mongodb");

class CoCreateMessage {
	constructor(wsManager, db) {
		// super(wsManager, db);
		this.wsManager = wsManager;
		this.init();
	}
	
	init() {
		if (this.wsManager) {
			this.wsManager.on('sendMessage',		(socket, data) => this.sendMessage(socket, data));
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
			
			if (data.broadcast_sender === true) {
				self.wsManager.send(socket, emit.message, emit.data, data['organization_id']);
			}

			if (data.broadcast !== false) {
				if (req_data.rooms && req_data.rooms.length > 0) {
					req_data.rooms.forEach((room) => {
						self.wsManager.broadcast(socket, req_data.namespace || data['organization_id'] , room, emit.message, emit.data, true);
					})
				} else {
					self.wsManager.broadcast(socket, req_data.namespace || data['organization_id'] , null, emit.message, emit.data);
				}
			}
			
		} catch (error) {
			console.log('sendMessage Error', error);
		}
	}
}
module.exports = CoCreateMessage;



