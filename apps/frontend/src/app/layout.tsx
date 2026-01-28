import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Container from "@/components/layouts/Container";
import Providers from "@/lib/providers/Providers";
import { GlobalLoadingOverlay } from "@/components/shared/GlobalLoadingOverlay";
import { LoadingProvider } from "@/store/loadingStore";

export const metadata: Metadata = {
  title: "Manoxen Enterprise",
  description: "Manoxen Enterprise Solution",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <Providers>
          <LoadingProvider>
            <GlobalLoadingOverlay />
            <Container>{children}</Container>
            <Toaster richColors position="top-right" />
          </LoadingProvider>
        </Providers>
      </body>
    </html>
  );
}
