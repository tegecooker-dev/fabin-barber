import { useEffect, useState } from "react";
import logoPng from "@/assets/logo.png";

// Module-level flag — resets on full page reload but persists across
// client-side navigation (React re-mounts). This ensures the splash
// only appears on the first real load, not on every route visit.
let hasShownSplash = false;

type Phase = "entering" | "cutting" | "done";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<Phase>("entering");

  useEffect(() => {
    // If already shown this session, skip immediately
    if (hasShownSplash) {
      setPhase("done");
      onComplete();
      return;
    }
    hasShownSplash = true;

    // Lock scroll while splash is active
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setPhase("cutting"), 1100);
    const t2 = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = prev;
      onComplete();
    }, 1850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = prev;
    };
  }, [onComplete]);

  if (phase === "done") return null;

  const isCutting = phase === "cutting";

  return (
    <>
      {/* ─── Keyframe definitions ────────────────────────────────────── */}
      <style>{`
        @keyframes fabin-logo-in {
          0%   { opacity: 0; transform: scale(0.80); filter: blur(10px); }
          100% { opacity: 1; transform: scale(1);    filter: blur(0);    }
        }
        @keyframes fabin-text-in {
          0%   { opacity: 0; transform: translateY(6px); letter-spacing: 0.18em; }
          100% { opacity: 1; transform: translateY(0);   letter-spacing: 0.30em; }
        }
        @keyframes fabin-glow-pulse {
          0%, 100% { box-shadow: 0 0 24px rgba(212,175,55,0.30), 0 0 60px rgba(212,175,55,0.10); }
          50%       { box-shadow: 0 0 48px rgba(212,175,55,0.55), 0 0 100px rgba(212,175,55,0.22); }
        }
        @keyframes fabin-panel-up {
          0%   { transform: translateY(0);     }
          100% { transform: translateY(-110%); }
        }
        @keyframes fabin-panel-down {
          0%   { transform: translateY(0);    }
          100% { transform: translateY(110%); }
        }
        @keyframes fabin-blade-sweep {
          0%   { clip-path: inset(0 100% 0 0); opacity: 0;   }
          8%   { opacity: 1;                                  }
          45%  { clip-path: inset(0 0%   0 0); opacity: 1;   }
          80%  { opacity: 1;                                  }
          100% { opacity: 0;                                  }
        }
        @keyframes fabin-logo-fade-out {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
      `}</style>

      {/* ─── Top panel (slides UP on cut) ─────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9997,
          background: "#000",
          /* Diagonal cut: left edge at 53%, right edge at 47% */
          clipPath: "polygon(0 0, 100% 0, 100% 47%, 0 53%)",
          animation: isCutting
            ? "fabin-panel-up 0.82s cubic-bezier(0.76, 0, 0.24, 1) forwards"
            : "none",
          willChange: "transform",
        }}
      />

      {/* ─── Bottom panel (slides DOWN on cut) ────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9997,
          background: "#000",
          clipPath: "polygon(0 53%, 100% 47%, 100% 100%, 0 100%)",
          animation: isCutting
            ? "fabin-panel-down 0.82s cubic-bezier(0.76, 0, 0.24, 1) forwards"
            : "none",
          willChange: "transform",
        }}
      />

      {/* ─── Logo + brand name ────────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9998,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          /* Fade-out the logo right as the blade fires */
          animation: isCutting
            ? "fabin-logo-fade-out 0.18s ease forwards"
            : "none",
          pointerEvents: "none",
        }}
      >
        {/* Logo image */}
        <img
          src={logoPng}
          alt="Fabin Barber Shop"
          width={150}
          height={150}
          style={{
            display: "block",
            width: "clamp(100px, 22vw, 150px)",
            height: "clamp(100px, 22vw, 150px)",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid rgba(212, 175, 55, 0.65)",
            animation: [
              "fabin-logo-in 0.70s cubic-bezier(0.22, 1, 0.36, 1) forwards",
              "fabin-glow-pulse 2.2s ease-in-out 0.75s infinite",
            ].join(", "),
            willChange: "transform, opacity, filter, box-shadow",
          }}
        />

        {/* Brand name text */}
        <div
          style={{
            marginTop: 22,
            fontFamily: "'Bebas Neue', 'Barlow', sans-serif",
            fontSize: "clamp(13px, 3.2vw, 20px)",
            letterSpacing: "0.30em",
            color: "rgba(212, 175, 55, 0.88)",
            opacity: 0,
            animation:
              "fabin-text-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.45s forwards",
            willChange: "transform, opacity, letter-spacing",
          }}
        >
          FABIN BARBER SHOP
        </div>

        {/* Subtle tagline */}
        <div
          style={{
            marginTop: 7,
            fontFamily: "'Barlow', sans-serif",
            fontSize: "clamp(9px, 1.8vw, 11px)",
            letterSpacing: "0.38em",
            color: "rgba(180, 140, 60, 0.55)",
            textTransform: "uppercase",
            opacity: 0,
            animation:
              "fabin-text-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) 0.65s forwards",
          }}
        >
          Del Lago · Itapoã · Desde 2022
        </div>
      </div>

      {/* ─── Gold blade line (sweeps on cut) ─────────────────────────── */}
      {isCutting && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            top: "calc(50% - 1px)",
            left: 0,
            right: 0,
            height: "2px",
            /* Mirror the panel diagonal angle */
            transform: "skewY(-3deg)",
            transformOrigin: "left center",
            background:
              "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0) 3%, rgba(212,175,55,0.85) 18%, rgba(255,255,255,0.95) 50%, rgba(212,175,55,0.85) 82%, rgba(212,175,55,0) 97%, transparent 100%)",
            boxShadow:
              "0 0 6px rgba(255,255,255,0.9), 0 0 18px rgba(212,175,55,0.7), 0 0 40px rgba(212,175,55,0.3)",
            zIndex: 9999,
            animation: "fabin-blade-sweep 0.65s ease-out forwards",
            willChange: "clip-path, opacity",
          }}
        />
      )}
    </>
  );
}
