import { useState, useEffect } from 'react';

export default function MessageSend({content, timestamp}) {
	const date = new Date(timestamp);
	const hours = date.getHours().toString().padStart(2, '0');
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const formattedTime = `${hours}:${minutes}`;

	return (
	<div className='flex justify-end'>
		<div className='flex flex-row w-fit max-w-[80%] p-1 bg-[--color-light-pink] mb-2 rounded-xl rounded-br-none'>
			<div className='m-1 text-start whitespace-pre-wrap break-words break-all'>
				{content}
			</div>
			<p className='text-xs self-end text-[--color-lightiest-pink] mr-1'>
				{formattedTime}
			</p>
		</div>
	</div>
	)
}
