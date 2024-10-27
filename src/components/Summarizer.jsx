import { useState } from 'react';
import { copy, linkIcon, tick } from "../assets"; // Import necessary assets
import { useLazyGetSummaryQuery } from "../redux/article";

const Summarizer = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "Enter a link to see the summary here.", // Initial message for summary
  });
  const [length, setLength] = useState(""); // State for summary length (initially blank)
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();
  const [copied, setCopied] = useState(false); // State to track if summary is copied

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Reset summary to empty while loading
    setArticle((prev) => ({ ...prev, summary: "" }));

    const { data } = await getSummary({ articleUrl: article.url, length }); // Send length with request

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      setArticle(newArticle);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(article.summary)
      .then(() => {
        setCopied(true); // Set copied state to true
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  const handleLengthChange = (e) => {
    const value = e.target.value;

    // Check if the value is a number and within the specified range
    if (value === '' || (value >= 1 && value <= 10)) {
      setLength(value); // Update state if valid
    }
  };

  return (
    <div className='w-full'>
      {/* Search */}
      <div className='flex flex-col w-full gap-2 items-center px-4'>
        <form className='flex flex-col w-full' onSubmit={handleSubmit}>
          <div className='flex items-center w-full mb-2'>
            <div className='relative flex items-center flex-grow'>
              <img
                src={linkIcon}
                alt='link_icon'
                className='absolute left-3 w-5'
              />
              <input
                type="url"
                placeholder='Paste your article link here'
                value={article.url}
                onChange={(e) => setArticle({ ...article, url: e.target.value })}
                className='w-full py-2 pl-10 pr-4 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg transition-shadow duration-300 ease-in-out'
                required
              />
            </div>
            <div className='ml-2 flex flex-col'>
              <input
                type="number"
                id="length"
                min="1"
                max="10"
                value={length}
                onChange={handleLengthChange} // Use the new handler
                placeholder='Number of Paragraphs in Summary(1-10)'
                className='py-2 px-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg transition-shadow duration-300 ease-in-out w-80'
                required
              />
            </div>
          </div>
          <div className='flex justify-center'>
            <button
              type="submit"
              className='bg-gradient-to-r from-blue-400 to-purple-400 font-bold text-white py-2 px-4 rounded-md transition duration-300 ease-in-out hover:from-blue-500 hover:to-purple-500'
              aria-label="Submit article link"
            >
              Summarize
            </button>
          </div>
        </form>
      </div>

      {/* Display summary */}
      <div className='mt-4 px-4'>
        <div className='relative bg-white border rounded-md shadow-md'>
          <div className='flex justify-between items-center p-4 border-b'>
            <h2 className='text-lg font-semibold text-gray-800'>Summary</h2>
            {article.summary !== "Enter a link to see the summary here." && (
              <button
                onClick={handleCopyToClipboard}
                className='flex items-center text-blue-600 hover:text-blue-800'
                aria-label="Copy summary to clipboard"
              >
                <img src={copied ? tick : copy} alt="Copy" className='w-4 h-4' />
                <span className={`ml-1 ${copied ? 'text-green-500' : 'hidden'}`}>
                  Copied
                </span>
              </button>
            )}
          </div>
          <div className='p-4'> {/* Added padding for the summary text */}
            {isFetching && <p>Loading...</p>} {/* Show loading inside container */}
            {error && <p className='text-red-500'>Error occurred: {error.message}</p>}
            {!isFetching && (
              <p className='text-gray-800'>{article.summary}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summarizer;
