import { useState } from "react";

export default function BioStep({nextStep, infosUser}) {
    const [textAreaIsFocused, setTextAreaIsFocused] = useState(false);
    const [inputText, setInputText] = useState("");

    function handleSubmit() { 
        infosUser.bio = inputText;
        nextStep();
    }

    return (
        <>
            <div className="strike mb-10">
                <span>A propos de moi</span>
            </div>
            <div className="mt-2 text-sm">
							<textarea
								className="h-36 w-full hover:ring-2 ring-slate-300 rounded-md p-2 focus:outline-none resize-none bg-slate-100 placeholder-gray-500 "
								maxLength="200"
								value={inputText || ""}
								onChange={(e) => setInputText(e.target.value.replace(/ {2,}/g, ' ').replace(/\n{1,}/g, ''))}
								spellCheck={false}
								onFocus={() => setTextAreaIsFocused(true)}
								onBlur={() => setTextAreaIsFocused(false)}
                                placeholder="Quelques mots pour parler de toi..."
							/>
							{textAreaIsFocused && (
								<p className="text-xs text-black justify-self-end">{inputText?.length || 0}/200</p>
							)}
                {inputText.length > 0 && (
                    <div className="flex justify-center mt-4">
                        <button className="btn" onClick={handleSubmit}>Valider</button>
                    </div>)}
						</div>
        </>
    )
}