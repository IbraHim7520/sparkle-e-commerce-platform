"use client";

import Link from "next/link";
import instaImage from "@/assets/insta.png"
import twitterImage from "@/assets/x.png"
import facebookImage from "@/assets/facebook.png"
import youtubeImage from "@/assets/youtube.png"
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100">
      
      <div className="max-w-[1600px] mx-auto px-3 lg:px-4 py-14">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand */}
          <div>
            <h2 className="text-xl font-black tracking-[0.25em] text-slate-900">
              SPARKLE <span className="text-indigo-500">✦</span>
            </h2>
            <p className="text-sm text-slate-500 mt-4 leading-relaxed">
              Modern fashion for modern lives. Premium streetwear designed for comfort, confidence, and individuality.
            </p>

            <div className="flex gap-3 mt-5">
              <a className="p-2 rounded-full bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition">
                <Image width={20} height={20} src={instaImage.src} alt="Instagram" className="w-4 h-4" />
              </a>
              <a className="p-2 rounded-full bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition">
                <Image width={20} height={20} src={twitterImage.src} alt="Twitter" className="w-4 h-4" />
              </a>
              <a className="p-2 rounded-full bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition">
                <Image width={20} height={20} src={facebookImage.src} alt="Facebook" className="w-4 h-4" />
              </a>
              <a className="p-2 rounded-full bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition">
                <Image width={20} height={20} src={youtubeImage.src} alt="Youtube" className="w-4 h-4" />
              </a>
            </div>
          </div>3

          {/* Shop */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4">Shop</h3>
            <div className="space-y-3 text-sm text-slate-600">
              <Link href="/new-arrivals" className="hover:text-indigo-600 block">
                New Drops
              </Link>
              <Link href="/collections" className="hover:text-indigo-600 block">
                Collections
              </Link>
              <Link href="/sale" className="hover:text-indigo-600 block">
                Sale
              </Link>
              <Link href="/trending" className="hover:text-indigo-600 block">
                Trending
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4">Support</h3>
            <div className="space-y-3 text-sm text-slate-600">
              <Link href="/help" className="hover:text-indigo-600 block">
                Help Center
              </Link>
              <Link href="/shipping" className="hover:text-indigo-600 block">
                Shipping Info
              </Link>
              <Link href="/returns" className="hover:text-indigo-600 block">
                Returns
              </Link>
              <Link href="/contact" className="hover:text-indigo-600 block">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4">
              Stay Updated
            </h3>

            <p className="text-sm text-slate-500 mb-4">
              Get exclusive deals & early access to drops.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-l-lg focus:outline-none focus:border-indigo-500"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 text-sm rounded-r-lg transition">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SPARKLE. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-indigo-600">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-indigo-600">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-indigo-600">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}