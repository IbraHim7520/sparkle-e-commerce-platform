
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick shipping on all orders with real-time tracking.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      description: "100% protected checkout with trusted payment methods.",
    },
    {
      icon: RotateCcw,
      title: "Easy Returns",
      description: "30-day hassle-free returns and exchanges.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Friendly customer support whenever you need help.",
    },
  ];

  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-[1600px] mx-auto px-3 lg:px-4">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-indigo-600">
            Why SPARKLE
          </span>

          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            Shopping Made Simple
          </h2>

          <p className="mt-3 text-slate-500 max-w-2xl mx-auto">
            Designed to give you a seamless shopping experience from
            checkout to delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-linear-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 border border-indigo-100 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>

                <h3 className="font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}