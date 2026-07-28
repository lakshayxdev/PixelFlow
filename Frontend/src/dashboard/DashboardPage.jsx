import StatsCard from "../components/StatsCard";
import UploadCard from "../components/UploadCard";
import ImageComparison from "../components/ImageComparison";
import ImageInfo from "../components/ImageInfo";
import { useState, useEffect } from "react";
import api from "../services/api";
import ClearButton from "../components/ClearButton";
import DashboardSkeleton from "../components/DashboardSkeleton";
import toast from "react-hot-toast";

import {
  Image,
  HardDrive,
  Gauge,
  Clock3,
} from "lucide-react";

const DashboardPage = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalImages: 0,
    spaceSaved: 0,
    avgCompression: 0,
    avgProcessingTime: 0,
});

const handleClear = () => {
    setUploadedImage(null);
    setIsProcessing(false);
    // setSelectedFile(null);
    // setIsUploading(false);
};

useEffect(() => {
    if (!isProcessing || !uploadedImage) return;
    const interval = setInterval(async () => {
        try {
            const response = await api.get(`/images/${uploadedImage._id}`);
            console.log(response.data.image.status);
            if (response.data.image.status === "completed") {
                setUploadedImage(response.data.image);
                setIsProcessing(false);
                clearInterval(interval);
            }
        } catch (error) {
            const message =
        error.response?.data?.message || "Something went wrong. Please try again.";

    toast.error(message);
        }
    }, 2000);
    return () => clearInterval(interval);

}, [isProcessing, uploadedImage]);

useEffect(() => {
    const fetchStats = async () => {
        try {
            const response = await api.get("/images/stats");
setStats(response.data);
            
        } catch (error) {
            console.log(error);
        }
        finally {
          setLoading(false);
        }
    };

    fetchStats();
}, []);


  return (
    <div className="max-w-7xl mx-auto px-2 py-8">

      {loading ? ( 
        <DashboardSkeleton />
      ) : (
        <>

       

      {/* Greeting */}
    <div className="mb-10">

  <h1 className="mt-3 text-4xl font-bold text-white">
    Welcome back,
    <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
      {" "}
      {user.name}
    </span>
    👋
  </h1>

  <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-400">
    Upload, compress, and optimize your images with
    <span className="font-semibold text-violet-400">
      {" "}
      PixelFlow
    </span>
    . Experience fast processing with real-time progress and detailed compression insights.
  </p>

</div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        <StatsCard
          title="Total Images"
          value={stats.totalImages}
          icon={<Image size={22} />}
        />

        <StatsCard
          title="Space Saved"
          value={`${stats.spaceSaved.toFixed(2)} MB`}
          icon={<HardDrive size={22} />}
        />

        <StatsCard
          title="Compression"
          value={`${stats.avgCompression.toFixed(2)}%`}
          icon={<Gauge size={22} />}
        />

        <StatsCard
          title="Avg Time"
          value={` ${stats.avgProcessingTime} ms`}
          icon={<Clock3 size={22} />}
        />

      </div>

      {/* Upload */}
      <div className="mb-10">
        <UploadCard setUploadedImage={setUploadedImage}  setIsProcessing={setIsProcessing}/>
       
      </div>

      {/* Comparison */}
      <div className="mb-8">
       <ImageComparison uploadedImage={uploadedImage} setIsProcessing={setIsProcessing} isProcessing={isProcessing} />
       
      </div>

      {/* Image Info */}
      <ImageInfo uploadedImage={uploadedImage}/>

      {uploadedImage && (
    <>

        <ClearButton
            handleClear={handleClear}
        />
    </>
)}

 </>
      )
      }

    </div>
  );
};

export default DashboardPage;