export default function GenderStep({nextStep, infosUser}) {
    function handleClik(e) {
            if (e.target.innerHTML === "homme")
                infosUser.gender = "man"
            else if (e.target.innerHTML === "femme")
                infosUser.gender = "woman"
            
            nextStep()
    }

    return (
        <>
            <div className="strike mb-10">
                <span>Je suis</span>
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
        </>
    )
}