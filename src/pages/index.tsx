import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <p className="max-w-xl text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 font-bold mb-12">
          LLM Boilerplate template provided by{" "}
          <a 
            href="https://withmarble.io" 
            className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Marble
          </a>
        </p>
        <div className="flex flex-col gap-6 items-center">
          <Link 
            href="/joke" 
            className="w-56 px-8 py-4 text-xl font-medium text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl hover:from-blue-700 hover:to-blue-900 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-900/30"
          >
            Joke Generator
          </Link>
          <Link 
            href="/recipe" 
            className="w-56 px-8 py-4 text-xl font-medium text-white bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl hover:from-purple-700 hover:to-purple-900 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-900/30"
          >
            Recipe Generator
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;