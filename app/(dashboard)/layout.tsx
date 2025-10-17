import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeaderComponent = () => {
 
  return (
    <header className="shadow">
      <div className="px-5 py-3 flex justify-between items-center">
        <div>
          <Image src="/logo.webp" alt="Logo" width={200} height={70} />
        </div>
        <nav className="hidden md:block">
          <ul className="flex items-center gap-x-5 font-semibold">
            <li><Link href="/help">Help Center</Link></li>
            <li> |</li>
            <li><Link href="/help">Sign Up</Link></li>
            <li><Link href="/signin"><Button variant="default" >Sign In</Button></Link></li>
          </ul>
        </nav>
        <Button variant="default" className="block md:hidden"><Menu /></Button>
      </div>
    </header>
  );
};

const layouts = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <HeaderComponent />
      {children}
    </main>
  );
};

export default layouts;
