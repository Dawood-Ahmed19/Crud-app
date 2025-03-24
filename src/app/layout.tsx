export const metadata = {
  title: "Create your tasks",
  description: "A simple task management application built with Next.js",
  keywords: ["task management", "next.js", "react"],
};

import RootLayout from "./RootLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout>{children}</RootLayout>;
}
