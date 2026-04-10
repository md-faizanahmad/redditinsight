export default function Header() {
  return (
    <div className="bg-black pt-6 pb-2 px-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold tracking-tighter text-white italic">
        REDDIT<span className="text-red-500">INSIGHT</span>
      </h1>
      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">
        Real Opinions • Real Users
      </p>
    </div>
  );
}
