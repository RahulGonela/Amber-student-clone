import Hero from '../components/Hero';
import PropertyList from '../components/PropertyList';

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our handpicked selection of student accommodations
          </p>
        </div>
        <PropertyList />
      </section>
    </div>
  );
}
