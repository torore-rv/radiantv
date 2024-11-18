import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
    const { data: session } = useSession(); // useSession 훅 사용

    return (
        <header>
            <div className="header-container flex justify-between items-center p-4">
                <div style={{ fontWeight: "bold" }}>Radiant Violet</div>
                {!session ? (
                    <div
                        style={{ fontSize: "0.9rem", cursor: "pointer" }}
                        onClick={() => signIn('google')}
                    >
                        Login
                    </div>
                ) : (
                    <div
                        style={{ fontSize: "0.9rem", cursor: "pointer" }}
                        onClick={() => signOut()}
                    >
                        Logout
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;