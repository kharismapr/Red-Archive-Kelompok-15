import React from "react";
import { Logo } from "../Logo";  
import { QuickLinks } from "./QuickLinks";
import { Contacts } from "./Contacts";

export const Footer = () => {
    return (
        <footer className="bg-[#7a1d26] text-white py-8 px-6 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo */}
            <Logo />

            {/* Quick Links */}
            <QuickLinks />

            {/* Contacts */}
            <Contacts />
        </div>

        {/* Copyright */}
        <p className="mt-8 text-sm text-white select-text">
            © 2025 Sistem Basis Data - Kelompok 15 | Kharisma Aprilia, Maxwell Zefanya, Raddief Ezra
        </p>
        </footer>
    );
};