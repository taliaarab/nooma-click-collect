import { useEffect } from 'react';
import { Shop } from './components/Shop';

export default function App() {
  useEffect(() => {
    const sendHeight = () => {
      window.parent.postMessage(
        {
          type: 'nooma:resize',
          height: document.documentElement.scrollHeight,
        },
        '*'
      );
    };

    const observer = new ResizeObserver(sendHeight);
    observer.observe(document.documentElement);

    window.addEventListener('load', sendHeight);
    sendHeight();

    return () => {
      observer.disconnect();
      window.removeEventListener('load', sendHeight);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Shop />
    </div>
  );
}
