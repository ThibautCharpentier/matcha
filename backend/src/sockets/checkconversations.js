const chat = require('../db/chat');

const firstSelect = async (ws) => {
    try {
        let res_query = await chat.getAllChatsAndMessagesByUserId(ws.user_id);
        if (!res_query)
            ws.close(4001);
        ws.conversations = res_query
    }
    catch (err) {
        console.log(err);
        ws.close(4001);
    }
}

const checkNewConversations = async (ws) => {
    let new_conversations = false
    try {
        let res_query = await chat.getAllChatsAndMessagesByUserId(ws.user_id);
        if (!res_query)
            ws.close(4001);
        if (res_query.length != ws.chat.length) {
            ws.chat = res_query
            new_conversations = true
        }
        else {
                if (ws.chat.length != res_query.length) {
                    new_conversations = true
                    ws.chat = res_query;
            }
        }
        if (new_conversations == true)
            ws.send(JSON.stringify(ws.chat));
    }
    catch (err) {
        console.log(err);
        ws.close(4001);
    }
}

const checkConversations = async (ws) => {
    if (ws.conversations == null) {
        ws.conversations = [];
        await firstSelect(ws);
        ws.send(JSON.stringify(ws.conversations));
    }
    else
        await checkNewConversations(ws);
}

module.exports = { checkConversations };
