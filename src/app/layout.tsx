import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "./redux/Providers";
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
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
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
