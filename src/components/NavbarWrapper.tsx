"use client";

import dynamic from "next/dynamic";

// This handles the dynamic loading with SSR disabled correctly
const Navbar = dynamic(() => import("./Navbar"), { ssr: false });

export default function NavbarWrapper() {
  return <Navbar />;
}
