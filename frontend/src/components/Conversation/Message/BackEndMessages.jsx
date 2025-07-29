import profile from '../../../assets/images/img_profile.png';
import { API_URL } from '../../../utils/constants';

export default function BackEndMessages({ messagesContainerRef, autoScroll, notifNewMessage, setNotifNewMessage }) {
    const pathPicture = API_URL + "/" + notifNewMessage?.contact_picture_profile;
    
    const handleBackEnd = () => {
        messagesContainerRef.current?.scrollTo({
            top: messagesContainerRef.current.scrollHeight,
            behavior: 'smooth',
        });
        setNotifNewMessage(false);
    }

    return (
        <div 
            className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[--color-light-green] shadow-lg transition-all duration-300 cursor-pointer hover:bg-[--color-dark-green] max-w-72
            ${!notifNewMessage ? 'rounded-full p-2' : 'rounded-3xl p-2'}
            ${!autoScroll ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-4 opacity-0 pointer-events-none'}
            `}
            onClick={handleBackEnd}
        >
    
            {!notifNewMessage ? (
                <svg width="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M12 3.25C12.4142 3.25 12.75 3.58579 12.75 4L12.75 18.1893L17.4697 13.4697C17.7626 13.1768 18.2374 13.1768 18.5303 13.4697C18.8232 13.7626 18.8232 14.2374 18.5303 14.5303L12.5303 20.5303C12.3897 20.671 12.1989 20.75 12 20.75C11.8011 20.75 11.6103 20.671 11.4697 20.5303L5.46967 14.5303C5.17678 14.2374 5.17678 13.7626 5.46967 13.4697C5.76256 13.1768 6.23744 13.1768 6.53033 13.4697L11.25 18.1893L11.25 4C11.25 3.58579 11.5858 3.25 12 3.25Z" fill="#000000"></path> </g></svg>
            ):(
                <div className='flex flex-row justify-center items-center min-w-0 overflow-hidden'>
                    <img src={notifNewMessage.contact_picture_profile ? pathPicture : profile} className="w-10 h-auto mr-2 rounded-full" style={{userSelect: 'none'}}/>
                    <p className='text-sm truncate break-all flex-1 min-w-0 overflow-hidden text-ellipsis'>{notifNewMessage.content}</p>
                </div>
            )}
        </div>
    );
}
