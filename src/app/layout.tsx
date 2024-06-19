import "~/styles/globals.css";
import Image from "next/image";
import { PageLayout } from "~/_Components/Layout";
import { GeistSans } from "geist/font/sans";
import TopNav from "~/_Components/NavBar";
export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <div className="flex items-center justify-center">
          <PageLayout>
            <TopNav></TopNav>
            {children}
          </PageLayout>
        </div>
      </body>
    </html>
  );
}