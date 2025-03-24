"use client";

import "../Styles/globals.css";
import { Metadata } from "next";
import { Providers } from "./Providers";
import Sidebar from "./Components/Sidebar/Sidebar";
import { usePathname } from "next/navigation";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const hideSideBarPaths = ["/", "/signup", "/login"];
  return (
    <html lang="en">
      <head>
        <link rel="icon" sizes="any" href="/favicon.svg" />
      </head>
      <body>
        <Providers>
          <div className="flex">
            {!hideSideBarPaths.includes(pathname) && <Sidebar />}
            <main className="flex-1"> {children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
