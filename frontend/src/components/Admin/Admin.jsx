import { useState } from "react";
import AdminAuth from "./Auth/AdminAuth"

export default function Admin() {
    const [token, setToken] = useState("")

    return (
        <>
            <header></header>
            <main>
                {token == "" ?
                    <AdminAuth
                        setToken={setToken}
                    />
                :
                    <>
                    </>
                }
            </main>
            <footer></footer>
        </>
    );
}
