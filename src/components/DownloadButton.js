import { useState, useEffect } from "react";

function DownloadButton({ isDisable }) {
    const [isLoading, setIsLoading] = useState(false);
    // const [isDisable, setIsDisable] = useState(true);
    useEffect(() => {
      console.log("download button disable:", isDisable)
    }, [isDisable]);

    async function handleDownloadClick() {
      setIsLoading(true);

      // Make an HTTP request to the backend API to download the computed data
      const response = await fetch("http://localhost:8000/data/get-transformed-data");
      const blob = await response.blob();

      // Create a URL for the downloaded file and initiate the download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "transformed_data.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log("download success")
      setIsLoading(false);
    }
    
    return (
      <button className="m-2 p-1 rounded border bg-white enabled:hover:bg-fuchsia-400 enabled:hover:text-white disabled:bg-gray-300"  
        onClick={handleDownloadClick} disabled={isDisable}
      >
        {isLoading ? "Downloading..." : "Download Data"}
      </button>
    );
}

export default DownloadButton;