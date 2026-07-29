import { ImageIcon, Sparkles, Loader2 } from "lucide-react";

const ImageComparison = ({ uploadedImage, isProcessing }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">

      {/* Original Image */}

      <div
        className="group rounded-2xl border border-zinc-800
        bg-gradient-to-b from-zinc-900 to-zinc-950
        p-6
        transition-all duration-300
        hover:-translate-y-1
        hover:border-violet-500
        hover:shadow-[0_0_30px_rgba(139,92,246,0.18)]"
      >

        <div className="mb-5 flex items-center gap-3">

          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl
            border border-cyan-500/20
            bg-cyan-500/10
            text-cyan-400"
          >
            <ImageIcon size={22} />
          </div>

          <h2 className="text-2xl font-bold text-cyan-400">
            Original Image
          </h2>

        </div>

        <div
          className="flex h-80 items-center justify-center overflow-hidden
          rounded-xl border border-zinc-700 bg-zinc-800"
        >
          {uploadedImage ? (
            <img
              src={`https://pixelflow-bkmh.onrender.com/${uploadedImage.originalImage}`}
              alt="Original"
              className="max-h-full max-w-full rounded-lg object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="text-center text-zinc-500">

              <ImageIcon
                size={45}
                className="mx-auto mb-3 opacity-40"
              />

              <p>No Image Selected</p>

            </div>
          )}
        </div>

      </div>

      {/* Processed Image */}

      <div
        className="group rounded-2xl border border-zinc-800
        bg-gradient-to-b from-zinc-900 to-zinc-950
        p-6
        transition-all duration-300
        hover:-translate-y-1
        hover:border-violet-500
        hover:shadow-[0_0_30px_rgba(139,92,246,0.18)]"
      >

        <div className="mb-5 flex items-center gap-3">

          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl
            border border-violet-500/20
            bg-violet-500/10
            text-cyan-400"
          >
            <Sparkles size={22} />
          </div>

          <h2 className="text-2xl font-bold text-cyan-400">
            Processed Image
          </h2>

        </div>

        <div
          className="flex h-80 items-center justify-center overflow-hidden
          rounded-xl border border-zinc-700 bg-zinc-800"
        >

          {uploadedImage?.processedImage ? (

            <img
              src={`https://pixelflow-bkmh.onrender.com/${uploadedImage.processedImage}`}
              alt="Processed"
              className="max-h-full max-w-full rounded-lg object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />

          ) : isProcessing ? (

            <div className="flex flex-col items-center">

              <Loader2
                size={42}
                className="animate-spin text-violet-500"
              />

              <p className="mt-4 text-violet-400 font-medium">
                Processing Image...
              </p>

            </div>

          ) : (

            <div className="text-center text-zinc-500">

              <Sparkles
                size={45}
                className="mx-auto mb-3 opacity-40"
              />

              <p>Waiting for Processing</p>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default ImageComparison;