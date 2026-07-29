const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse">


      <div className="mb-10">

        <div className="h-4 w-24 rounded bg-zinc-800"></div>

        <div className="mt-4 h-10 w-80 rounded bg-zinc-800"></div>

        <div className="mt-4 h-5 w-[420px] rounded bg-zinc-800"></div>

      </div>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
          >
            <div className="h-12 w-12 rounded-xl bg-zinc-800"></div>

            <div className="mt-5 h-4 w-24 rounded bg-zinc-800"></div>

            <div className="mt-4 h-8 w-20 rounded bg-zinc-800"></div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default DashboardSkeleton;