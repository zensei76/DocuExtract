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


{
  "customerDetails": {
    "name": "Emily Johnson",
    "address": "789 Maple Avenue, Springfield, IL, 62704",
    "phone": "217-555-1234",
    "email": "emilyjohnson@example.com"
  },
  "productDetails": [
    {
      "productName": "Ultra Widget",
      "rate": "120.00 INR",
      "quantity": "5",
      "amount": "600.00 INR"
    },
    {
      "productName": "Mega Steel",
      "rate": "500.00 INR",
      "quantity": "3",
      "amount": "1500.00 INR"
    },
    {
      "productName": "Nano Gadget",
      "rate": "200.00 INR",
      "quantity": "7",
      "amount": "1400.00 INR"
    },
    {
      "productName": "Eco Widget",
      "rate": "150.00 INR",
      "quantity": "4",
      "amount": "600.00 INR"
    }
  ],
  "totalBill": {
    "totalAmount": "3,100.00 INR",
    "totalInWords": "Three Thousand One Hundred Rupees Only"
  }
}


 
`;
