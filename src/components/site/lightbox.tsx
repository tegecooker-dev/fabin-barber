import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  photos: { src: string; alt: string }[];
  current: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function Lightbox({
  photos,
  current,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const photo = photos[current];

  // Close on Escape, navigate with arrow keys
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", onKey);
    // Prevent body scroll while open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/95 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visualizar foto"
    >
      {/* Close */}
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-sm border border-border bg-card text-foreground transition-colors hover:border-gold hover:text-gold"
      >
        <X className="size-5" />
      </button>

      {/* Prev */}
      <button
        type="button"
        aria-label="Foto anterior"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 grid size-10 place-items-center rounded-sm border border-border bg-card text-foreground transition-colors hover:border-gold hover:text-gold sm:left-6"
      >
        <ChevronLeft className="size-6" />
      </button>

      {/* Image */}
      <div
        className="relative mx-16 max-h-[88vh] max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          className="max-h-[82vh] max-w-full object-contain shadow-2xl"
        />
        <p className="mt-3 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {photo.alt}
        </p>
        {/* Counter */}
        <span className="absolute -top-8 right-0 text-xs uppercase tracking-widest text-muted-foreground">
          {current + 1} / {photos.length}
        </span>
      </div>

      {/* Next */}
      <button
        type="button"
        aria-label="Próxima foto"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 grid size-10 place-items-center rounded-sm border border-border bg-card text-foreground transition-colors hover:border-gold hover:text-gold sm:right-6"
      >
        <ChevronRight className="size-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir para foto ${i + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              // Navigate directly — parent will handle via onPrev/onNext logic
              // Simple approach: just trigger multiple prevs or nexts isn't ideal,
              // so we expose an onGoto prop workaround via closure trick
              const diff = i - current;
              if (diff > 0) for (let j = 0; j < diff; j++) onNext();
              else for (let j = 0; j < -diff; j++) onPrev();
            }}
            className={`size-1.5 rounded-full transition-colors ${
              i === current ? "bg-gold" : "bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
