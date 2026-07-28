import {
  HardDrive,
  Download,
  TrendingDown,
  Clock3,
  CheckCircle2,
  ReceiptText 
} from "lucide-react";

const ImageInfo = ({ uploadedImage }) => {
  const formatBytes = (bytes) => {
    if (!bytes) return "Not Available";

    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024)
      return `${(bytes / 1024).toFixed(1)} KB`;

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const compression =
    uploadedImage?.compressionRatio?.toFixed(2) || 0;

  return (
    <div
      className="mt-8 rounded-2xl border border-zinc-800
      bg-gradient-to-b from-zinc-900 to-zinc-950 p-6"
    >
      <h2 className="mb-6 text-3xl font-bold text-cyan-400 flex items-center gap-2">
        <ReceiptText />
        Image Details
      </h2>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">

        <InfoCard
          icon={<HardDrive size={20} />}
          title="Original Size"
          value={formatBytes(uploadedImage?.originalSize)}
        />

        <InfoCard
          icon={<Download size={20} />}
          title="Compressed"
          value={formatBytes(uploadedImage?.processedSize)}
        />

        <InfoCard
          icon={<TrendingDown size={20} />}
          title="Saved"
          value={`${compression}%`}
          highlight
        />

        <InfoCard
          icon={<Clock3 size={20} />}
          title="Processing"
          value={
            uploadedImage?.processingTime
              ? `${uploadedImage.processingTime} ms`
              : "Not Available"
          }
        />

        <InfoCard
          icon={<CheckCircle2 size={20} />}
          title="Status"
          value={uploadedImage?.status || "Not Available"}
          status
        />

      </div>

      {uploadedImage && (
        <div className="mt-10">

          <div className="mb-3 flex items-center justify-between">

            <span
              className="rounded-full border border-violet-500/20
              bg-violet-500/10 px-4 py-2
              text-sm font-medium text-violet-300 mb-3"
            >
              Compression Efficiency
            </span>

            <span className="text-xl font-bold text-green-400">
              {compression}%
            </span>

          </div>

          <div className="h-4 w-full overflow-hidden rounded-full bg-zinc-800">

            <div
              className="h-full rounded-full bg-gradient-to-r
              from-violet-500 via-fuchsia-500 to-green-400
              transition-all duration-700"
              style={{
                width: `${compression}%`,
              }}
            />

          </div>

        </div>
      )}
    </div>
  );
};

const InfoCard = ({
  icon,
  title,
  value,
  highlight = false,
  status = false,
}) => {

  let valueColor = "text-white";

  if (highlight) valueColor = "text-green-400";

  if (status) {
    if (value === "completed") valueColor = "text-green-400";
    else if (value === "processing") valueColor = "text-yellow-400";
    else if (value === "pending") valueColor = "text-blue-400";
    else if (value === "failed") valueColor = "text-red-400";
    else valueColor = "text-zinc-500";
  }

  return (
    <div
      className="group cursor-pointer rounded-2xl border border-zinc-700
      bg-zinc-800/40 p-5
      transition-all duration-300
      hover:-translate-y-1
      hover:scale-[1.03]
      hover:border-violet-500
      hover:shadow-[0_0_30px_rgba(139,92,246,0.18)]"
    >

      <div
        className="flex h-11 w-11 items-center justify-center
        rounded-xl border border-violet-500/20
        bg-violet-500/10
        text-violet-400
        transition-transform duration-300
        group-hover:scale-110"
      >
        {icon}
      </div>

      <p className="mt-4 text-sm font-medium tracking-wide text-zinc-400">
        {title}
      </p>

      <h3 className={`mt-2 text-2xl font-bold ${valueColor}`}>
        {value}
      </h3>

    </div>
  );
};

export default ImageInfo;