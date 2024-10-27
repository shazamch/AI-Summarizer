import Hero from './components/Hero';
import Summarizer from './components/Summarizer';

const App = () => {
  
  return (
    <div className="h-screen bg-gradient-to-br from-blue-100 to-purple-50">
      <Hero />
      <Summarizer />
    </div>
  );
}

export default App;
