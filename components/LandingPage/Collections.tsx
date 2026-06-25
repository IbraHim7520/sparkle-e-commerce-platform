"use client";

import Link from "next/link";
import Image, { StaticImageData } from "next/image";

import newInImage from "@/assets/new_in.jpg"
import cardigansImage from "@/assets/cardigans.jpg"
import accesoriesImage from "@/assets/accessories.jpg"
import shoesImage from "@/assets/shoes.jpg"
import manFashion from "@/assets/fashion.jpg"


interface CollectionItem {
  id: string;
  badge?: string;
  title: string;
  image: StaticImageData;
  href: string;
  isLarge?: boolean;
}

export default function Collections() {
  const items: CollectionItem[] = [
    {
      id: "best-seller",
      badge: "20% OFF",
      title: "Best Seller",
      image:
        manFashion,
      href: "/collections/best-seller",
      isLarge: true,
    },
    {
      id: "new-in",
      title: "New In",
      image:
        newInImage,
      href: "/collections/new-in",
    },
    {
      id: "shoes",
      title: "Shoes",
      image:
        shoesImage,
      href: "/collections/shoes",
    },
    {
      id: "cardigans",
      title: "Cardigans",
      image:
        cardigansImage,
      href: "/collections/cardigans",
    },
    {
      id: "accessories",
      title: "Accessories",
      image:
        accesoriesImage,
      href: "/collections/accessories",
    },
  ];

  const featured = items.find((item) => item.isLarge);
  const regularItems = items.filter((item) => !item.isLarge);

  return (
    <section className="bg-white py-14">
      <div className="max-w-[1600px] mx-auto px-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Featured Card */}
          {featured && (
            <Link
              href={featured.href}
              className="lg:col-span-5 relative h-[420px] lg:h-[620px] rounded-2xl overflow-hidden group"
            >
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-8 left-8 text-white">
                {featured.badge && (
                  <span className="inline-block bg-white text-black text-xs font-semibold px-3 py-1 rounded-full mb-4">
                    {featured.badge}
                  </span>
                )}

                <h2 className="text-3xl lg:text-4xl font-bold mb-3">
                  {featured.title}
                </h2>

                <span className="text-sm uppercase tracking-[3px] border-b border-white pb-1">
                  Shop Now
                </span>
              </div>
            </Link>
          )}

          {/* Right Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {regularItems.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                className="relative h-[280px] lg:h-[300px] rounded-2xl overflow-hidden group"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-semibold mb-2">
                    {card.title}
                  </h3>

                  <span className="text-xs uppercase tracking-[2px] border-b border-white pb-1">
                    Shop Now
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}