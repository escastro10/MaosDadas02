import QueryProvider from "@/lib/react-query";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Indicadores Sustentáveis - FIEB",
  description: "FIEB Sede",
  icons: {
    icon: '/fav-icon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <ClerkProvider>
        <html lang="pt-BR">
          <body className={`${inter.className} bg-white`}>
            <Toaster richColors />
            {children}
          </body>
        </html>
      </ClerkProvider>
    </QueryProvider>

  );
}
