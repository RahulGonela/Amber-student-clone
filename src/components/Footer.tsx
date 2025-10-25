import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-red-600">amber</span>
              <span className="text-2xl font-bold">student</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Find your perfect student accommodation worldwide. Safe, affordable, and convenient.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-600 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-600 transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-red-600 transition">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-red-600 transition">Contact</a>
              </li>
              <li>
                <a href="#" className="hover:text-red-600 transition">Blog</a>
              </li>
              <li>
                <a href="#" className="hover:text-red-600 transition">FAQs</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Cities</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-red-600 transition">London</a>
              </li>
              <li>
                <a href="#" className="hover:text-red-600 transition">Manchester</a>
              </li>
              <li>
                <a href="#" className="hover:text-red-600 transition">Edinburgh</a>
              </li>
              <li>
                <a href="#" className="hover:text-red-600 transition">Birmingham</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get the latest properties and offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-600"
              />
              <button className="px-4 py-2 bg-red-600 rounded-r-lg hover:bg-red-700 transition">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 AmberStudent. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
