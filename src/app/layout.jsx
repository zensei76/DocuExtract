import { Inter } from "next/font/google";
import "./globals.css";
import Head from 'next/head'; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DocuExtract",
  description:
    "A powerful tool for extracting key details from invoice PDFs. Automatically retrieves customer information, product details, and total amounts, providing clear and actionable insights from your documents.",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      {/* <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}
