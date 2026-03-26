"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer"; // Adjust casing if your filename is Footer.tsx

export default function FooterWrapper() {
  const pathname = usePathname();

  // Define the pages where the footer SHOULD be visible
  const showFooterOn = ["/", "/about", "/contact"];

  // Logic: Only render Footer if the current path is in the list
  if (showFooterOn.includes(pathname)) {
    return <Footer />;
  }

  return null;
}
