import { useState } from "react";

function DownloadButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDownloadClick() {
    setIsLoading(true);

    // Make an HTTP request to the backend API to download the computed data
    const response = await fetch("http://localhost:8000/data/get-computed-data");
    const blob = await response.blob();

    // Create a URL for the downloaded file and initiate the download
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "computed_data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsLoading(false);
  }

  return (
    <button className="border hover:bg-fuchsia-400"  onClick={handleDownloadClick}>
      {isLoading ? "Downloading..." : "Download Data"}
    </button>
  );
}

export default DownloadButton;