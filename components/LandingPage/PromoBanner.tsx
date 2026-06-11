export function PromoBanner() {
  return (
    <section className="py-12">
      <div className="max-w-[1600px] mx-auto px-3 lg:px-4">
        
        <div className="relative bg-slate-900 text-white rounded-2xl overflow-hidden p-10">
          
          <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1521335629791-ce4aec67dd47')] bg-cover" />

          <div className="relative z-10">
            <h2 className="text-3xl font-bold">
              Summer Sale — Up to 40% OFF
            </h2>
            <p className="text-slate-300 mt-2">
              Limited time offer on selected collections
            </p>

            <button className="mt-5 bg-white text-slate-900 px-5 py-2 rounded-lg font-medium hover:bg-indigo-500 hover:text-white transition">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}