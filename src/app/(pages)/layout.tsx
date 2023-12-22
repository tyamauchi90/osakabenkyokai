import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Toaster } from "../components/shadcn/ui/toaster";
import { ThemeProvider } from "../components/theme/theme-provider";
import { Providers } from "../redux/Providers";
import "./globals.css";
import Loading from "./loading";
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
      <body className="font-body">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <Header />
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <Toaster />
            <Footer />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
