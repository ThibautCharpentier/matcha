const { IsString, IsInt } = require('class-validator');

class NewMessageDto {
    @IsString()
    newMessage;

    @IsInt()
    receiver_id;

    @IsInt()
    room_id;

    validateFields() {
        const allowedFields = ['newMessage', 'room_id', 'receiver_id'];
        const receivedFields = Object.keys(this);
        const unauthorizedFields = receivedFields.filter(field => !allowedFields.includes(field));
        if (unauthorizedFields.length > 0)
            throw new Error(`Champs non autorisés : ${unauthorizedFields.join(', ')}`);
    }
}

module.exports = { NewMessageDto };
