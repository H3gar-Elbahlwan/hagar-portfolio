import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
export const metadata = {
  title: "Hagar Ehab Elbahlawan | Network & Cloud Security Engineer",
  description: "Portfolio of Hagar Ehab Elbahlawan: secure networks, cloud systems, and aspiring SOC analyst.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
