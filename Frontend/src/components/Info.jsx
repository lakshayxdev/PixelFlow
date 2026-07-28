const Info = ({ title, value }) => {

  let color = "text-white";

  if (title === "Status") {
    if (value === "completed") color = "text-green-400";
    else if (value === "processing") color = "text-yellow-400";
    else if (value === "pending") color = "text-blue-400";
    else if (value === "failed") color = "text-red-400";
    else color = "text-zinc-500";
  }

  return (
    <div>
      <p className="text-zinc-400 text-sm">
        {title}
      </p>

      <p className={`${color} font-semibold mt-1`}>
        {value || "Not Available"}
      </p>
    </div>
  );
};

export default Info;