import ReactMarkdown from 'react-markdown';

export default function Modal({ isOpen, onClose, data }) {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-black">Extracted Data</h2>
        <div className="mb-4 text-black">
          <ReactMarkdown>{data}</ReactMarkdown>
        </div>
        <button 
          onClick={onClose}
          className="bg-blue-600 text-white rounded-full py-2 px-4 hover:bg-blue-700 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}
