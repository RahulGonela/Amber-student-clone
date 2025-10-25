import { Heart, Star, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Property } from '../lib/supabase';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      checkIfSaved();
    }
  }, [user, property.id]);

  const checkIfSaved = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('saved_properties')
      .select('id')
      .eq('user_id', user.id)
      .eq('property_id', property.id)
      .maybeSingle();

    setIsSaved(!!data);
  };

  const toggleSave = async () => {
    if (!user) {
      alert('Please sign in to save properties');
      return;
    }

    if (isSaved) {
      await supabase
        .from('saved_properties')
        .delete()
        .eq('user_id', user.id)
        .eq('property_id', property.id);
      setIsSaved(false);
    } else {
      await supabase.from('saved_properties').insert({
        user_id: user.id,
        property_id: property.id,
      });
      setIsSaved(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.image_url}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        />
        <button
          onClick={toggleSave}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition"
        >
          <Heart
            className={`w-5 h-5 ${
              isSaved ? 'fill-red-600 text-red-600' : 'text-gray-600'
            }`}
          />
        </button>
        <div className="absolute bottom-3 left-3 bg-white px-3 py-1 rounded-full text-sm font-semibold">
          {property.property_type}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {property.title}
        </h3>

        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span>
            {property.location}, {property.city}
          </span>
        </div>

        <div className="flex items-center mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
          <span className="font-semibold text-gray-900 mr-1">
            {property.rating}
          </span>
          <span className="text-gray-600 text-sm">
            ({property.total_reviews} reviews)
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
            >
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
              +{property.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <div className="text-2xl font-bold text-red-600">
              {property.currency} {property.price}
            </div>
            <div className="text-xs text-gray-600">per week</div>
          </div>
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
