import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function FileUpload({ onFileUpload, isUploading }) {
	const [file, setFile] = useState(null); // State to store the selected file.

	// useCallback to handle file drop and set the file state.
	const onDrop = useCallback((acceptedFiles) => {
		if (acceptedFiles && acceptedFiles.length > 0) {
			setFile(acceptedFiles[0]); // Set the first file from the dropped files.
		}
	}, []);

	// Destructure necessary functions and states from useDropzone.
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop, // Function to handle file drop.
		accept: { "application/pdf": [".pdf"] }, // Accept only PDF files.
		multiple: false, // Allow only one file to be uploaded at a time.
	});

	// Function to handle form submission and trigger file upload.
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent the default form submission behavior.
		if (!file) {
			alert("Please select a PDF file"); // Alert if no file is selected.
			return;
		}
		onFileUpload(file); // Call the onFileUpload function with the selected file.
	};

	return (
		<div className='mt-10 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8'>
			<form onSubmit={handleSubmit} className='mb-4'>
				<div className='space-y-4'>
					<div
						{...getRootProps()}
						className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
							isDragActive
								? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/30"
								: "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
						}`}
					>
						<input {...getInputProps()} />{" "}
						{/* Hidden input for file selection */}
						<div className='flex flex-col items-center'>
							<svg
								className='w-12 h-12 text-gray-400 dark:text-gray-500 mb-4'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
								/>
							</svg>
							{isDragActive ? (
								<p className='text-lg font-semibold text-blue-500 dark:text-blue-400'>
									Drop the PDF file here ...
								</p>
							) : (
								<>
									<p className='text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2'>
										Drag & drop a PDF file here
									</p>
									<p className='text-sm text-gray-500 dark:text-gray-400'>
										or{" "}
										<span className='text-blue-500 dark:text-blue-400 underline'>
											browse
										</span>{" "}
										to choose a file
									</p>
								</>
							)}
						</div>
					</div>

					<div className='bg-gray-50 dark:bg-gray-800 rounded-lg p-4 min-h-[80px] flex items-center'>
						{file ? (
							<div className='flex items-center w-full'>
								<svg
									className='w-8 h-8 text-gray-400 dark:text-gray-500 mr-3 flex-shrink-0'
									fill='currentColor'
									viewBox='0 0 20 20'
								>
									<path
										fillRule='evenodd'
										d='M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z'
										clipRule='evenodd'
									/>
								</svg>
								<div className='overflow-hidden'>
									<p className='text-sm font-medium text-gray-800 dark:text-gray-200 truncate'>
										{file.name}
									</p>
									<p className='text-xs text-gray-500 dark:text-gray-400'>
										{(file.size / 1024 / 1024).toFixed(2)} MB
									</p>
								</div>
							</div>
						) : (
							<p className='text-sm text-gray-500 dark:text-gray-400 w-full text-center'>
								No file selected
							</p>
						)}
					</div>

					<button
						type='submit'
						className={`px-6 py-3 w-full text-white font-medium rounded-full transition-all duration-300 ${
							isUploading || !file
								? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
								: "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
						}`}
						disabled={isUploading || !file} // Disable the button if uploading or no file is selected.
					>
						{isUploading ? (
							<span className='flex items-center justify-center'>
								<svg
									className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
								>
									<circle
										className='opacity-25'
										cx='12'
										cy='12'
										r='10'
										stroke='currentColor'
										strokeWidth='4'
									></circle>
									<path
										className='opacity-75'
										fill='currentColor'
										d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
									></path>
								</svg>
								Processing... {/* Show a loading spinner if uploading */}
							</span>
						) : (
							"Extract Invoice Details"
						)}
					</button>
				</div>
			</form>
		</div>
	);
}
