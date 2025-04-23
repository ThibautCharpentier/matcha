import { useState, useEffect } from 'react';

export default function AllMessages({roomId}) {

    conversations = [{
        id : roomId,
        idUser1: 1,
        idUser2: 2,
        messages: [{
            idSender: 1,
            content: "Hello, comment ca va ?",
            timestamp: "",
        },
        {
            idSender: 2,
            content: "Super et toi ?",
            timestamp: "",
        }]
    }]
    return (
        <>
            
        </>
    )
}
