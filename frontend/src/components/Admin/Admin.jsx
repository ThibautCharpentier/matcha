import { useState } from "react";
import AdminAuth from "./Auth/AdminAuth"
import ReportList from "./ReportList/ReportList";

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
                    <ReportList
                        token={token}
                    />
                }
            </main>
            <footer></footer>
        </>
    );
}
