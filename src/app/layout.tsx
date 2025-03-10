import "../Styles/globals.css";
import { Metadata } from "next";
import { Providers } from "./Providers";

export const metadata: Metadata = {
  title: "Create your tasks",
  description: "A simple task management application built with Next.js",
  keywords: ["task management", "next.js", "react"],
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" sizes="any" href="/favicon.svg" />
      </head>
      <body>
        <Providers> {children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
