"use client";
import { useState } from "react";
import FileUpload from "./ui/FileUpload";
import Modal from "./ui/Modal";

export default function Home() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [extractedData, setExtractedData] = useState(null);
	const [isUploading, setIsUploading] = useState(false);

	const handleFileUpload = async (file) => {
		if (!file) {
			alert("Please select a PDF file");
			return;
		}
		setIsUploading(true);
		try {
			const formData = new FormData();
			formData.append("pdf", file);
			const response = await fetch("/api/extract-invoice", {
				method: "POST",
				body: formData,
			});
			if (!response.ok) {
				throw new Error("Failed to process invoice");
			}
			const data = await response.json();

			setExtractedData(data.markdown);

			setIsModalOpen(true);
		} catch (error) {
			console.error("Error:", error);
			alert("Error processing invoice");
		} finally {
			setIsUploading(false);
		}
	};
	






	return (
		<main>
			<div className='h-screen flex flex-col pb-6'>
				<div className='h-full flex flex-col justify-center'>
					<div className='-mt-20 max-w-4xl w-full text-center mx-auto px-4 sm:px-6 lg:px-8'>
						<h1 className='text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white'>
							Welcome to Parser AI
						</h1>
						<p className='mt-3 text-gray-600 dark:text-neutral-400'>
							Your AI-powered Invoice Extractor
						</p>
					</div>
					<FileUpload
						onFileUpload={handleFileUpload}
						isUploading={isUploading}
					/>
					<Modal
						isOpen={isModalOpen}
						onClose={() => setIsModalOpen(false)}
						data={extractedData}
					/>
				</div>
			</div>
		</main>
	);
}
