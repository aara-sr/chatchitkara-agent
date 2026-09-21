import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chitkara Knowledge Enterprise Agent",
  description: "Ask questions and find information from the Chitkara enterprise knowledge base.",
};

const themeInit = `(function(){try{var stored=localStorage.getItem("chitkara-theme");var theme=stored==="dark"||stored==="light"?stored:(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",theme);}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
