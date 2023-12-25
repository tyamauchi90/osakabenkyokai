import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Toaster } from "./components/shadcn/ui/toaster";
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
          <div className="lg:container">
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <Toaster />
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
