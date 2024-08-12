import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";

const LLAMA_API_BASE = "https://api.cloud.llamaindex.ai/api";

async function uploadFile(file) {
	const formData = new FormData();
	const buffer = Buffer.from(await file.arrayBuffer());

	// Append the file and parsingInstruction to the form data
	formData.append("file", buffer, {
		filename: file.name,
		contentType: "application/pdf",
	});
	formData.append("parsing_instruction", parsingInstruction);

	// Make the POST request
	const response = await axios.post(
		`${LLAMA_API_BASE}/parsing/upload`,
		formData,
		{
			headers: {
				...formData.getHeaders(),
				Authorization: `Bearer ${process.env.LLAMA_CLOUD_API_KEY}`,
				accept: "application/json",
			},
		}
	);

	return response.data.id; // This is the job ID
}
async function getParsingResults(jobId) {
	const response = await axios.get(
		`${LLAMA_API_BASE}/parsing/job/${jobId}/result/markdown`,
		{
			headers: {
				Authorization: `Bearer ${process.env.LLAMA_CLOUD_API_KEY}`,
				accept: "application/json",
			},
		}
	);

	return response.data;
}

async function pollForResults(jobId, maxAttempts = 10, delay = 2000) {
	for (let i = 0; i < maxAttempts; i++) {
		try {
			const result = await getParsingResults(jobId);
			return result;
		} catch (error) {
			if (error.response && error.response.status === 404) {
				// Job not completed yet, wait and try again
				await new Promise((resolve) => setTimeout(resolve, delay));
			} else {
				throw error; // Unexpected error, rethrow
			}
		}
	}
	throw new Error("Parsing job timed out");
}

export async function POST(req) {
	try {
		const data = await req.formData();
		const file = data.get("pdf");

		if (!file) {
			return NextResponse.json(
				{ message: "PDF file is required" },
				{ status: 400 }
			);
		}

		const jobId = await uploadFile(file);
		const result = await pollForResults(jobId);

		return NextResponse.json(result);
	} catch (error) {
		console.error("Error processing invoice:", error);
		return NextResponse.json(
			{ message: "Error processing invoice" },
			{ status: 500 }
		);
	}
}

const parsingInstruction = `1.Customer Details
Name: Look for "Bill To:", "Customer Name:", or similar labels.
Address: Extract text following the name, usually including street, city, state, and postal code.
Phone Number: Identify 10-digit numbers, often labeled "Ph:" or "Phone:".
Email: Find email addresses (text with "@" and domain) near the name or address.
2.Product Details
Sections/Tables: Look for keywords like "Item", "Description", or "Product".
Descriptions: Extract product names/descriptions from relevant columns.
Numeric Values: Capture rate, quantity, and total amounts for each product.
3.Total Amount
Labels: Search for "Total Amount", "Amount Payable", "Grand Total", etc.
Amount: Extract the numeric total at the bottom of the invoice.
Words: Also extract the total amount written in words if available.

Sample  Output

---
#### **Customer Details :**

- **Name**: Jane Smith
- **Address**: 456 Elm Street, Metropolis, NY, 10001
- **Phone Number**: 2125557890
- **Email**: janesmith@example.com

---

#### **Product Details:**

- **Product Name**: Super Widget
  - **Rate**: 75.00 INR
  - **Quantity**: 8
  - **Amount**: 600.00 INR

- **Product Name**: Super Widget
  - **Rate**: 75.00 INR
  - **Quantity**: 8
  - **Amount**: 600.00 INR

---

#### **Total Amount :**

- **Total Amount**: 1050.00 INR
- **Amount in Words**: One Thousand Fifty Rupees Only


 
`;
