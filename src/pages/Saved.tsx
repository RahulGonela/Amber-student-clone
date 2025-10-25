import { useEffect, useState } from 'react';
import { supabase, Property } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import PropertyCard from '../components/PropertyCard';
import { Loader, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Saved() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchSavedProperties();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchSavedProperties = async () => {
    if (!user) return;

    setLoading(true);
    const { data: savedData, error: savedError } = await supabase
      .from('saved_properties')
      .select('property_id')
      .eq('user_id', user.id);

    if (savedError) {
      console.error('Error fetching saved properties:', savedError);
      setLoading(false);
      return;
    }

    if (!savedData || savedData.length === 0) {
      setProperties([]);
      setLoading(false);
      return;
    }

    const propertyIds = savedData.map((item) => item.property_id);

    const { data: propertiesData, error: propertiesError } = await supabase
      .from('properties')
      .select('*')
      .in('id', propertyIds);

    if (propertiesError) {
      console.error('Error fetching properties:', propertiesError);
    } else {
      setProperties(propertiesData || []);
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sign in to view saved properties
          </h2>
          <p className="text-gray-600 mb-6">
            Create an account or sign in to save your favorite properties
          </p>
          <Link
            to="/login"
            className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Saved Properties
          </h1>
          <p className="text-gray-600">
            {properties.length} {properties.length === 1 ? 'property' : 'properties'} saved
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              No saved properties yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start exploring and save your favorite properties
            </p>
            <Link
              to="/properties"
              className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
