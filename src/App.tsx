import { useEffect, useState } from 'react';
import MainSite from './MainSite';
import Admin from './Admin';

export default function App() {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (route === '#admin') {
    return <Admin />;
  }

  return <MainSite />;
}
