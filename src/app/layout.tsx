import "./globals.css";
import type { Metadata } from "next";
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
