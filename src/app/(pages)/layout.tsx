import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Toaster } from "../components/shadcn/ui/toaster";
// import { ThemeProvider } from "../components/theme/theme-provider";
import { Providers } from "../redux/Providers";
import "./globals.css";
import Loading from "./loading";
// import { Provider } from "react-redux";
// import { store } from "./redux/store";
import { SpeedInsights } from "@vercel/speed-insights/next";
import HeaderSp from "../components/HeaderSp";
import Favicon from "/public/img/top/favicon.ico";

export const metadata: Metadata = {
  title: "おおさか勉強会",
  description: "おおさか勉強会のWebサイトです",
  icons: [
    {
      rel: "icon",
      url: Favicon.src,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="font-body overflow-x-hidden">
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
        <Providers>
          <SpeedInsights />
          <Header />
          <HeaderSp />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Toaster />
          <Footer />
        </Providers>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
