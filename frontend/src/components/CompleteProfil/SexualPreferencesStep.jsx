export default function SexualPreferencesStep({nextStep, infosUser}) {
    let titleSection 
    
    if (infosUser.gender === "men")
        titleSection = "Je suis intéressé par"
    else
        titleSection = "Je suis intéressée par"

    function handleClik(e) {
        e.preventDefault()

        console.log(e)
        if (e.target.innerHTML === "homme")
            infosUser.sexual_preferences = "men"
        else if (e.target.innerHTML === "femme")
            infosUser.sexual_preferences = "women"
        else if (e.target.innerHTML === "tout le monde")
            infosUser.sexual_preferences = "bi"
        
        nextStep()
    }

    return (
        <>
            <div className="strike mb-10">
                <span>{titleSection}</span>
            </div>
            <div className="flex h-auto items-center justify-center">
                <ul className="flex">
                    <li>
                        <button className="btn text-sm mr-4 hover:bg-slate-100 hover:text-black"
                        onClick={handleClik}>
                            homme
                        </button>
                    </li>
                    <li>
                        <button className="btn text-sm ml-4 hover:bg-slate-100 hover:text-black"
                        onClick={handleClik}>femme</button>
                    </li>
                </ul>
            </div>
            <div className="flex justify-center mt-5">
                <button className="btn text-sm hover:bg-slate-100 hover:text-black" onClick={handleClik}>tout le monde</button>
            </div> 
            
        </>
    )
}