import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Gallery } from '../components/Gallery';
import { Contact } from '../components/Contact';

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Gallery />
      <Contact />
    </>
  );
}
