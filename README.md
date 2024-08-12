<<<<<<< HEAD
# Invoice Parser Tool

This project is a Next.js-based application that processes invoice PDFs and extracts critical details using LlamaParse for PDF parsing. The tool allows users to upload an invoice in PDF format, from which it automatically extracts and displays key information such as customer details, product listings, and the total amount due.

## Key Features
- **PDF Parsing**: Utilizes LlamaParse to extract structured data from invoice PDFs.
- **Customer Details Extraction**: Automatically pulls customer name, address, contact information, and other relevant details from the invoice.
- **Product Information**: Extracts and lists all products or services mentioned in the invoice, including descriptions, quantities, and prices.
- **Total Amount Calculation**: Accurately calculates and displays the total amount due, including taxes and other charges if applicable.
- **User-Friendly Interface**: Built with Next.js to provide a seamless and responsive user experience.

## Tech Stack
- **Frontend**: Next.js, React.js
- **Backend**: Next.js API routes for handling PDF uploads and processing
- **PDF Parsing**: LlamaParse

## How to Use
1. Clone the repository.
2. Create a `.env` file in the root directory and add the following variables:

    ```plaintext
    # LlamaParse API Keys or Credentials
    LLAMAPARSE_API_KEY=your-llamaparse-api-key-here
    ```

3. Install dependencies using `pnpm install`.
4. Run the development server with `pnpm run dev`.
5. Navigate to `http://localhost:3000` and upload your invoice PDF to extract details.

=======
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
>>>>>>> ece2b23 (Initial commit from Create Next App)
