const StatsCard = ({ title, value, icon }) => {
  return (
    <div
      className="group bg-gradient-to-b from-zinc-900 to-zinc-950
      border border-zinc-800
      rounded-2xl
      p-6
      transition-all duration-300
      hover:border-violet-500
      hover:-translate-y-1
      hover:shadow-[0_0_30px_rgba(139,92,246,0.18)]"
    >

      <div
        className="w-12 h-12 rounded-xl
        bg-violet-500/10
        border border-violet-500/20
        flex items-center justify-center
        text-violet-500
        transition-transform duration-300
        group-hover:scale-110"
      >
        {icon}
      </div>

      <p className="mt-5 text-sm font-medium tracking-wide text-zinc-400">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold text-white break-words">
        {value}
      </h2>

    </div>
  );
};

export default StatsCard;