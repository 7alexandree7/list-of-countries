import React from "react";
import Image from "next/image";

const NavBar = () => {
    return (
        <nav className="w-full bg-white h-16 flex items-center justify-center">
            <section className="container flex items-center gap-3">
                <Image src="/logo.svg" alt="Logo mapa mundi" width={46} height={46} />
                <h1 className="font-bold text-2xl">Lista De Países</h1>
            </section>
        </nav>
    );
};

export default NavBar;
