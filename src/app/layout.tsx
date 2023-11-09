import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "./components/organisms/Footer";
import Header from "./components/organisms/Header";
import "./globals.css";
import Loading from "./loading";
import { Providers } from "./redux/Providers";
// import { Provider } from "react-redux";
// import { store } from "./redux/store";

export const metadata: Metadata = {
  title: "おおさか勉強会",
  description: "おおさか勉強会のWebサイトです",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <Header />
          <Suspense fallback={<Loading />}>{children}</Suspense>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
