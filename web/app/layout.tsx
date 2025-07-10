import type { Metadata } from "next";
import "./globals.css"
import { Providers } from "./providers";
import { metadata as baseMetadata } from "./utils/metadata";

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  ...baseMetadata
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
