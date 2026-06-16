import { Link } from 'react-router';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl mb-4 text-primary" style={{ fontFamily: "'Chelsea Market', cursive" }}>
          404
        </h1>
        <p className="text-2xl md:text-3xl mb-8 text-primary">
          Page non trouvée
        </p>
        <p className="text-lg text-muted mb-8">
          Désolé, la page que vous recherchez n'existe pas.
        </p>
        <Link
          to="/"
          className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full hover:bg-primary/90 transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
