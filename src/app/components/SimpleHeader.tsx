export function SimpleHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm z-50 border-b border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-20">
          <div className="flex items-center gap-2">
            <img
              src="/src/imports/Capture_d_e_cran_2026-05-20_a__17.04.43.png"
              alt="NOOMA"
              className="h-12"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
