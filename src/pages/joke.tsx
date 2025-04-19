import { useState } from 'react';

const JokePage = () => {
  const [joke, setJoke] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const generateJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gen_joke', {
        method: 'POST',
      });
      const data = await response.json();
      setJoke(data.joke);
    } catch (error) {
      console.error('Error fetching joke:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Joke Generator</h1>
          <button
            onClick={generateJoke}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate New Joke'}
          </button>
          {joke && (
            <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
              <p className="text-lg text-gray-800">{joke}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JokePage; 