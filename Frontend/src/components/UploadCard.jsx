// import { UploadCloud } from "lucide-react";
// import { useRef, useState } from "react";
// import api from "../services/api";
// import toast from "react-hot-toast";
// import { Upload } from "lucide-react";
// import { MdOutlineFileOpen } from "react-icons/md";


// const UploadCard = ({setUploadedImage, setIsProcessing}) => {

//     const [selectedFile, setSelectedFile] = useState(null);
// // const [uploadedImage, setUploadedImage] = useState(null);
// const [isUploading, setIsUploading] = useState(false);

//     const handleUpload = async () => {
//     if (!selectedFile || isUploading) return;

//     setIsUploading(true);

//     const formData = new FormData();
//     formData.append("image", selectedFile);

//     try {
//         const response = await api.post("/images/upload", formData);

//         setUploadedImage(response.data.image);

//         setIsProcessing(true);

//         toast.success(response.data.message);
//         console.log("Uploaded Image:", response.data.image);

//         setSelectedFile(null);

//     } catch (error) {
//         toast.error(
//             error.response?.data?.message || "Upload failed"
//         );
//     } finally {
//         setIsUploading(false);
//     }
// };

// const fileInputRef = useRef(null);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     setSelectedFile(file);

//     console.log(file);
//   };

//   return (
//     <div className="rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-900 p-12 flex flex-col items-center justify-center">

//       <UploadCloud
//         size={50}
//         className="mb-4 text-violet-500"
//       />

//       <h2 className="text-xl font-semibold text-white">
//         Upload an Image
//       </h2>

//       <p className="mt-2 text-zinc-400">
//         Drag & Drop or Choose Image
//       </p>

//       <button
//         onClick={() => fileInputRef.current.click()}
//         className="mt-6 rounded-lg bg-violet-600 px-6 py-3 font-medium cursor-pointer text-white transition hover:bg-violet-700 flex items-center justify-center gap-2"
//       >
//         <MdOutlineFileOpen size={20}/>
//         Choose Image
//       </button>

//       {/* Hidden File Input */}
//       <input
//         type="file"
//         accept="image/*"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         className="hidden"
//       />

//       {/* Selected File Name */}
//       {selectedFile && (
//         <p className="mt-4 text-sm text-zinc-400">
//           Selected:{" "}
//           <span className="font-medium text-white">
//             {selectedFile.name}
//           </span>
//         </p>
//       )}

//       {selectedFile && (
//     <div className="mt-6 w-full">
//         <img
//             src={URL.createObjectURL(selectedFile)}
//             alt="Preview"
//             className="mx-auto max-h-72 rounded-lg border border-zinc-700 object-contain"
//         />
//     </div>
// )}

// {selectedFile && (
//    <button
//     onClick={handleUpload}
//     disabled={isUploading || !selectedFile}
//     className={`mt-4 w-[13%] rounded-lg py-3 text-white transition flex items-center justify-center gap-2 ${
//         isUploading || !selectedFile
//             ? "cursor-not-allowed bg-zinc-700"
//             : "bg-violet-600 hover:bg-violet-700"
//     }`}
// >
//      {isUploading ? (
//     <>
//       <Upload size={18} />
//       Uploading...
//     </>
//   ) : (
//     <>
//       <Upload size={18} />
//       Upload Image
//     </>
//   )}
// </button>
// )}
//     </div>
//   );
// };

// export default UploadCard;



import { UploadCloud, Upload } from "lucide-react";
import { MdOutlineFileOpen } from "react-icons/md";
import { useRef, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const UploadCard = ({ setUploadedImage, setIsProcessing }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || isUploading) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await api.post("/images/upload", formData);

      setUploadedImage(response.data.image);
      setIsProcessing(true);

      toast.success(response.data.message);

      setSelectedFile(null);
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong. Please try again.";

    toast.error(message);

    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="rounded-2xl border-2 border-dashed border-zinc-700 bg-gradient-to-b from-zinc-900 to-zinc-950 p-10 flex flex-col items-center justify-center transition hover:border-violet-500">

      <UploadCloud
        size={60}
        className="text-violet-500 mb-5 transition group-hover:scale-110"
      />

      <h2 className="text-3xl font-bold text-white">
        Upload an Image
      </h2>

      <p className="mt-3 text-zinc-400 text-center">
        Drag & Drop your image here
        <br />
        or browse from your computer
      </p>

      <p className="mt-3 text-sm text-zinc-500">
        Supports JPG • PNG • WEBP &nbsp; | &nbsp; Max 10 MB
      </p>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="mt-8 flex flex-wrap justify-center gap-4">

        <button
          onClick={() => fileInputRef.current.click()}
          className="flex items-center gap-2 rounded-lg cursor-pointer bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-700"
        >
          <MdOutlineFileOpen size={20} />
          Choose Image
        </button>

        <button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition
          ${
            !selectedFile || isUploading
              ? "bg-zinc-700 cursor-not-allowed"
              : "bg-violet-600 hover:bg-violet-700 cursor-pointer"
          }`}
        >
          <Upload size={18} />

          {isUploading ? "Uploading..." : "Upload Image"}
        </button>

      </div>

      {selectedFile && (
        <div className="mt-6 w-full max-w-lg rounded-xl border border-zinc-700 bg-zinc-900 p-4">

          <p className="text-center text-sm text-zinc-400">
            Selected File
          </p>

          <p className="mt-1 text-center font-medium text-white truncate">
            {selectedFile.name}
          </p>

          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Preview"
            className="mt-5 mx-auto max-h-72 rounded-lg border border-zinc-700 object-contain"
          />

        </div>
      )}
    </div>
  );
};

export default UploadCard;