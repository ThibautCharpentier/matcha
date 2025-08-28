class NewMessageDto {
    constructor(data) {
        this.newMessage = data.newMessage.trim();
        this.receiver_id = data.receiver_id;
        this.room_id = data.room_id;

        const allowedFields = ['newMessage', 'receiver_id', 'room_id'];
        const receivedFields = Object.keys(data);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }

    validate() {
        const errors = [];

        if (typeof this.newMessage !== 'string' || this.newMessage === '')
            errors.push('NewMessage doit être une chaîne de caractères non vide.');

        if (!Number.isInteger(this.receiver_id))
            errors.push('Receiver_id doit être un entier.');

        if (!Number.isInteger(this.room_id))
            errors.push('Room_id doit être un entier.');

        if (errors.length > 0)
            throw new Error(errors.join(' | '));
    }
}

module.exports = { NewMessageDto };
