import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";
import { parsingInstruction } from "@/app/constatns/index";

const LLAMA_API_BASE = "https://api.cloud.llamaindex.ai/api";

async function uploadFile(file) {
	const formData = new FormData();
	const buffer = Buffer.from(await file.arrayBuffer());

	// To append the file and parsingInstruction to the form data
	formData.append("file", buffer, {
		filename: file.name,
		contentType: "application/pdf",
	});
	formData.append("parsing_instruction", parsingInstruction);

	//To make the POST request
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

	return response.data.id; //  job ID
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
				throw error; // Unexpected error
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
