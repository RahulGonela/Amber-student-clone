import { Search, MapPin } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-red-600 to-red-700 text-white">
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect Student Home
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-red-50">
            Discover safe, affordable, and convenient accommodation worldwide
          </p>

          <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-xl p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="City, university, or neighborhood"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 text-gray-800"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2 font-semibold"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <span className="text-red-100">Popular searches:</span>
            <button
              onClick={() => {
                setSearchQuery('London');
                navigate('/properties?search=London');
              }}
              className="text-white underline hover:text-red-100 transition"
            >
              London
            </button>
            <button
              onClick={() => {
                setSearchQuery('Manchester');
                navigate('/properties?search=Manchester');
              }}
              className="text-white underline hover:text-red-100 transition"
            >
              Manchester
            </button>
            <button
              onClick={() => {
                setSearchQuery('Edinburgh');
                navigate('/properties?search=Edinburgh');
              }}
              className="text-white underline hover:text-red-100 transition"
            >
              Edinburgh
            </button>
          </div>
        </div>
      </div>

      <div className="relative bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">1M+</div>
              <div className="text-gray-600">Students Helped</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">10K+</div>
              <div className="text-gray-600">Properties</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">250+</div>
              <div className="text-gray-600">Cities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">15+</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
