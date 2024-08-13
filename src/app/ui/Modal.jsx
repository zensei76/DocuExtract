import React, { useState } from "react";

export default function Modal({ isOpen, onClose, data }) {
	const [isCopied, setIsCopied] = useState(false); // State to track if the text has been copied.

	if (!isOpen) return null; // If the modal is not open, return null to render nothing.

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(data); // Copy the data to the clipboard.
			setIsCopied(true); // Set copied state to true.
			setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds.
		} catch (err) {
			console.error("Failed to copy text: ", err); // Log error if copy fails.
		}
	};

	const parseData = JSON.parse(data); // Parse the JSON data.

	// Destructure the parsed data to extract necessary details.
	const {
		customerDetails: { name, address, phone, email },
		productDetails,
		totalBill: { totalAmount, totalInWords },
	} = parseData;

	return (
		<div className='fixed inset-0 z-50 overflow-x-hidden overflow-y-auto bg-black/50 backdrop-blur-sm flex items-center justify-center'>
			<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl w-full max-w-lg m-3 transition-all duration-300 ease-out transform'>
				<div className='flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-gray-700'>
					<h4 className='font-bold text-gray-800 dark:text-white text-center flex-grow'>
						Extracted Data
					</h4>
					<button
						type='button'
						className='w-8 h-8 flex justify-center items-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600'
						onClick={onClose}
						aria-label='Close'
					>
						<span className='sr-only'>Close</span>
						<svg
							className='w-4 h-4'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						>
							<path d='M18 6 6 18'></path>
							<path d='m6 6 12 12'></path>
						</svg>
					</button>
				</div>
				<div className='p-4 overflow-y-auto max-h-[calc(100vh-200px)]'>
					<div className='text-gray-800 dark:text-gray-200'>
						{/* Customer Details */}
						<p className='font-semibold text-lg mb-4'>Customer Details</p>
						<ul className='mb-4 space-y-2'>
							<li>
								<span className='font-medium'>Name:</span> {name}
							</li>
							<li>
								<span className='font-medium'>Address:</span> {address}
							</li>
							<li>
								<span className='font-medium'>Phone:</span> {phone}
							</li>
							<li>
								<span className='font-medium'>Email:</span> {email}
							</li>
						</ul>

						{/* Product Details */}
						<p className='font-semibold text-lg mb-4'>Product Details</p>
						<div className='flex flex-col space-y-2'>
							{productDetails.map((product, index) => (
								<div
									key={index}
									className='flex flex-wrap items-center justify-between gap-2 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg'
								>
									<span className='font-medium'>
										{index + 1}. {product.productName}
									</span>
									<br />
									<span className='text-sm'>Rate: {product.rate}</span>
									<span className='text-sm'>Qty: {product.quantity}</span>
									<span className='font-medium'>Amount: {product.amount}</span>
								</div>
							))}
						</div>

						{/* Total Bill */}
						<p className='font-semibold text-lg mt-6 mb-2'>Total Amount</p>
						<ul className='space-y-2'>
							<li>
								<span className='font-medium'>Total Amount:</span> {totalAmount}
							</li>
							<li>
								<span className='font-medium'>Amount in Words:</span>{" "}
								{totalInWords}
							</li>
						</ul>
					</div>
				</div>
				<div className='flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200 dark:border-gray-700'>
					<button
						type='button'
						onClick={handleCopy}
						className='py-2 px-4 inline-flex items-center text-sm font-semibold rounded-full border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-offset-gray-800'
					>
						{isCopied ? "Copied!" : "Copy"}{" "}
						{/* Button text changes based on copy state */}
					</button>
					<button
						type='button'
						onClick={onClose}
						className='py-2 px-4 inline-flex items-center text-sm font-semibold rounded-full border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all dark:focus:ring-offset-gray-800'
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
