import { useRef, useState } from "react";
import EmailForm from "./EmailForm";
import CodeForm from "./CodeForm";

export default function AdminAuth({ setToken }) {
    const [authStep, setAuthStep] = useState("email")
    let idAdmin = useRef(null)

    return (
        <>
            <div className="flex justify-center">
                <div className="w-80 flex flex-col p-2 mt-6 bg-gray-400 rounded-2xl">
                    <h1 className="text-3xl text-center font-poppins-bold text-gray-50">ADMIN</h1>
                    {authStep == "email" &&
                        <EmailForm
                            setAuthStep={setAuthStep}
                            idAdmin={idAdmin}
                        />
                    }
                    {authStep == "code" &&
                        <CodeForm
                            setToken={setToken}
                            idAdmin={idAdmin}
                        />
                    }
                </div>
            </div>
        </>
    )
}
