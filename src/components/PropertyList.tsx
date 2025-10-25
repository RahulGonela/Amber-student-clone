import { useEffect, useState } from 'react';
import { supabase, Property } from '../lib/supabase';
import PropertyCard from './PropertyCard';
import { Loader } from 'lucide-react';

interface PropertyListProps {
  searchQuery?: string;
}

export default function PropertyList({ searchQuery }: PropertyListProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, [searchQuery]);

  const fetchProperties = async () => {
    setLoading(true);
    let query = supabase.from('properties').select('*');

    if (searchQuery) {
      query = query.or(
        `city.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%,title.ilike.%${searchQuery}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching properties:', error);
    } else {
      setProperties(data || []);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg">
          No properties found. Try adjusting your search.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
