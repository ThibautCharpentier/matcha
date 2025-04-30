import { useState, useEffect } from 'react';

export default function MessageReceived({content, timestamp}) {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    return (
        <div className='flex justify-start'>
            <div className='flex flex-row w-fit p-1 bg-gray-200 mb-5 rounded-xl rounded-bl-none'>
                <div className='m-2 text-start whitespace-pre-wrap'>
                    {content}
                </div>
                <p className='text-xs self-end text-gray-500 mr-1'>{formattedTime}</p>
            </div>
        </div>
    )
}
