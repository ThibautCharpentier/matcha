export default function ToggleProfile({toggleProfile, switchToggleProfile}) {

    return (
        <div className="bg-gray-200 w-full rounded-3xl max-h-[60px] aspect-[20/3] sm:h-[60px] justify-center flex items-center">
            <div className="text-gray-500 flex flex-row items-center justify-between sm:w-[60%]">
                <span className={`${toggleProfile && "text-gray-900"} pr-3`}>Profil</span>
                <button onClick={switchToggleProfile}
                    className="relative w-24 h-8 bg-pink-600 rounded-full"
                >
                
                <div
                    className={`absolute top-1 left-1 w-10 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
                    toggleProfile ? "translate-x-0" : "translate-x-[calc(100%+0.5rem)]"
                    }`}
                ></div>
                </button>
                <span className={`${!toggleProfile && "text-gray-900"} pl-3`}>Photos</span>
            </div>
        </div>
    )
}
