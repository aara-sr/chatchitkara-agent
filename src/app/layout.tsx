import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chitkara Enterprise Knowledge",
  description: "Ask questions and find information from the Chitkara enterprise knowledge base.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
