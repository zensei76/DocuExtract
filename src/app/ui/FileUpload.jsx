// FileUpload.js
import React, { useState } from "react";

export default function FileUpload({ onFileUpload, isUploading }) {
	const [file, setFile] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!file) {
			alert("Please select a PDF file");
			return;
		}
		onFileUpload(file);
	};

	return (
		<div class='mt-10 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
			<div class='relative'>
				<form onSubmit={handleSubmit} className='mb-4'>
					<input
						type='file'
						accept='.pdf'
						onChange={(e) => setFile(e.target.files?.[0] || null)}
						className='w-full p-2 border rounded-full'
						required
					/>
					<button
						type='submit'
						className='mt-2 px-4 py-2 bg-blue-500 text-white w-full rounded-full'
						disabled={isUploading}
					>
						{isUploading
							? "Processing (this may take a few seconds)..."
							: "Extract Invoice Details"}
					</button>
				</form>
			</div>
		</div>
	);
}
