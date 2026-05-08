import React, { useEffect, useMemo, useRef, useState } from "react";

const surpriseCards = [
  {
    title: "Surprise 1",
    preview: "A bestfriend like you makes every ordinary day feel special.",
    reveal:
      "You make life feel lighter, happier, and more beautiful just by being you.",
  },
  {
    title: "Surprise 2",
    preview:
      "You deserve joy that keeps sparkling long after the candles fade.",
    reveal:
      "May your days be full of peace, laughter, little wins, and sweet memories.",
  },
  {
    title: "Surprise 3",
    preview:
      "Deepika, your smile is the kind of magic this website is built for.",
    reveal:
      "Your smile has the power to brighten everything around you — never forget that.",
  },
  {
    title: "Surprise 4",
    preview:
      "Some surprises are hidden. Some are obvious. All of them are for you.",
    reveal:
      "This whole page is a tiny universe made just to celebrate your special day.",
  },
];

const secretMessages = [
  "You are the main character today.",
  "Scroll slowly. The page is watching you smile.",
  "One click can unlock a tiny moment of happiness.",
  "Your birthday story is written in stars, glitter, and laughter.",
];

const memoryPhotos = [
  {
    src: "/memory-1.jpg",
    caption: "One of those little moments worth keeping forever.",
  },
  {
    src: "/memory-2.jpg",
    caption: "A memory that feels warm every time you look at it.",
  },
  {
    src: "/memory-3.jpg",
    caption: "Smiles, light, and a tiny bit of magic.",
  },
  {
    src: "/memory-4.jpg",
    caption: "A beautiful day captured in a beautiful frame.",
  },
];

function FloatingShape({ className, style }) {
  return (
    <div
      className={`absolute rounded-full blur-2xl opacity-35 ${className}`}
      style={style}
    />
  );
}

function ConfettiBurst({ seed, count = 36 }) {
  const pieces = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 140 + Math.random() * 120;

      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        delay: Math.random() * 0.35,
        size: 5 + Math.random() * 8,
        shape: i % 9 === 0 ? "❤" : i % 7 === 0 ? "✨" : "",
      };
    });
  }, [seed, count]);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={`${seed}-${i}`}
          className="absolute flex items-center justify-center rounded-full font-bold"
          style={{
            width: p.size,
            height: p.size,
            background:
              p.shape === ""
                ? [
                    "#f472b6",
                    "#a78bfa",
                    "#22d3ee",
                    "#fbbf24",
                    "#fb7185",
                    "#ffffff",
                  ][i % 6]
                : "transparent",
            color:
              p.shape === "❤"
                ? "#ff4d6d"
                : p.shape === "✨"
                  ? "#fff7ae"
                  : "white",
            fontSize: p.size * 1.35,
            animation: `confettiFly 1.7s cubic-bezier(.12,.8,.18,1) ${p.delay}s forwards`,
            opacity: 0,
            "--tx": `${p.x}px`,
            "--ty": `${p.y}px`,
          }}
        >
          {p.shape}
        </span>
      ))}
    </div>
  );
}

function SparkleFrame({ children, className = "" }) {
  const sparkles = [
    { x: "-8px", y: "-8px", size: 7, delay: "0s" },
    { x: "calc(100% + 2px)", y: "-6px", size: 5, delay: "0.4s" },
    { x: "-10px", y: "calc(100% + 1px)", size: 6, delay: "0.8s" },
    { x: "calc(100% + 6px)", y: "calc(100% + 3px)", size: 7, delay: "1.1s" },
  ];

  return (
    <div className={`relative inline-flex ${className}`}>
      {children}

      <span className="pointer-events-none absolute inset-0">
        {sparkles.map((s, idx) => (
          <span
            key={idx}
            className="absolute rounded-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,.65)]"
            style={{
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              animation: `twinkle 2.8s ease-in-out ${s.delay} infinite`,
              opacity: 0.65,
            }}
          />
        ))}
      </span>
    </div>
  );
}

function MemoryCarousel({ photos, isMobile }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || photos.length <= 1) return;

    const timer = window.setInterval(
      () => {
        setIndex((prev) => (prev + 1) % photos.length);
      },
      isMobile ? 5200 : 4200,
    );

    return () => clearInterval(timer);
  }, [paused, photos.length, isMobile]);

  const goTo = (next) => {
    const total = photos.length;
    setIndex((next + total) % total);
  };

  return (
    <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/7 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl mobile-lite sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">
            Memory carousel
          </p>
          <h4 className="mt-1 text-lg font-semibold text-white/90">
            Little moments, softly moving
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => goTo(index - 1)}
            className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm transition hover:bg-white/15"
          >
            ←
          </button>
          <button
            onClick={() => goTo(index + 1)}
            className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm transition hover:bg-white/15"
          >
            →
          </button>
        </div>
      </div>

      <div
        className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#10101a]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {photos.map((photo, i) => (
            <div key={photo.src + i} className="min-w-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/10]">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p className="text-sm leading-6 text-white/95 sm:text-base">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-7 bg-white" : "w-2 bg-white/40"
              }`}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StarField({ isMobile }) {
  const layer1 = useMemo(
    () =>
      Array.from({ length: isMobile ? 16 : 28 }, (_, i) => ({
        top: `${(i * 17) % 100}%`,
        left: `${(i * 29) % 100}%`,
        size: 2 + (i % 3),
        delay: `${(i % 6) * 0.4}s`,
      })),
    [isMobile],
  );

  const layer2 = useMemo(
    () =>
      Array.from({ length: isMobile ? 10 : 18 }, (_, i) => ({
        top: `${(i * 23 + 11) % 100}%`,
        left: `${(i * 41 + 7) % 100}%`,
        size: 3 + (i % 3),
        delay: `${(i % 5) * 0.5}s`,
      })),
    [isMobile],
  );

  const layer3 = useMemo(
    () =>
      Array.from({ length: isMobile ? 7 : 12 }, (_, i) => ({
        top: `${(i * 31 + 19) % 100}%`,
        left: `${(i * 37 + 13) % 100}%`,
        size: 4 + (i % 2),
        delay: `${(i % 4) * 0.6}s`,
      })),
    [isMobile],
  );

  const StarDot = ({ item, type }) => (
    <span
      className="absolute rounded-full bg-white/80"
      style={{
        top: item.top,
        left: item.left,
        width: item.size,
        height: item.size,
        opacity: type === 1 ? 0.28 : type === 2 ? 0.42 : 0.55,
        animation: `starTwinkle ${type === 1 ? 6 : type === 2 ? 5 : 4}s ease-in-out ${item.delay} infinite`,
        transform: `translate3d(calc(var(--mx, 0px) * ${type === 1 ? 0.02 : type === 2 ? 0.05 : 0.08}), calc(var(--my, 0px) * ${type === 1 ? 0.02 : type === 2 ? 0.05 : 0.08}), 0)`,
      }}
    />
  );

  return (
    <>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,.06),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,.10),transparent_35%)]" />

        <div
          className="absolute inset-0"
          style={{
            transform:
              "translate3d(calc(var(--mx, 0px) * 0.01), calc(var(--my, 0px) * 0.01), 0)",
          }}
        >
          {layer1.map((item, i) => (
            <StarDot key={`s1-${i}`} item={item} type={1} />
          ))}
        </div>

        <div
          className="absolute inset-0"
          style={{
            transform:
              "translate3d(calc(var(--mx, 0px) * 0.03), calc(var(--my, 0px) * 0.03), 0)",
          }}
        >
          {layer2.map((item, i) => (
            <StarDot key={`s2-${i}`} item={item} type={2} />
          ))}
        </div>

        <div
          className="absolute inset-0"
          style={{
            transform:
              "translate3d(calc(var(--mx, 0px) * 0.06), calc(var(--my, 0px) * 0.06), 0)",
          }}
        >
          {layer3.map((item, i) => (
            <StarDot key={`s3-${i}`} item={item} type={3} />
          ))}
        </div>
      </div>
    </>
  );
}

export default function BirthdaySurpriseWebsite() {
  const [showLetter, setShowLetter] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [secretIndex, setSecretIndex] = useState(0);
  const [secretText, setSecretText] = useState("");
  const [secretFading, setSecretFading] = useState(false);
  const [confettiSeed, setConfettiSeed] = useState(1);
  const [typed, setTyped] = useState("");
  const [openSurpriseIndex, setOpenSurpriseIndex] = useState(null);
  const [giftOpened, setGiftOpened] = useState(false);
  const [giftOpening, setGiftOpening] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const audioRef = useRef(null);
  const sceneRef = useRef(null);
  const rafRef = useRef(0);
  const fullText = "Happy Birthday, Deepika ✨";

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);
    update();

    if (media.addEventListener) {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.35;
    }
  }, []);

  useEffect(() => {
    const playMusicAutomatically = async () => {
      if (!audioRef.current) return;

      try {
        await audioRef.current.play();
        setMusicOn(true);
      } catch (err) {
        console.log("Autoplay blocked by browser");
      }
    };

    playMusicAutomatically();
  }, []);

  useEffect(() => {
    let index = 0;
    const speed = isMobile ? 120 : 90;

    const t = setInterval(() => {
      index += 1;
      setTyped(fullText.slice(0, index));
      if (index >= fullText.length) clearInterval(t);
    }, speed);

    return () => clearInterval(t);
  }, [isMobile]);

  useEffect(() => {
    let typingTimer;
    let pauseTimer;
    let fadeTimer;

    const message = secretMessages[secretIndex];

    if (secretText.length < message.length) {
      typingTimer = window.setTimeout(
        () => {
          setSecretText(message.slice(0, secretText.length + 1));
        },
        isMobile ? 130 : secretText.length < 10 ? 95 : 55,
      );
    } else {
      pauseTimer = window.setTimeout(() => {
        setSecretFading(true);

        fadeTimer = window.setTimeout(() => {
          setSecretIndex((prev) => (prev + 1) % secretMessages.length);
          setSecretText("");
          setSecretFading(false);
        }, 500);
      }, 2200);
    }

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(pauseTimer);
      clearTimeout(fadeTimer);
    };
  }, [secretIndex, secretText, isMobile]);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;

    const handlePointerMove = (e) => {
      if (isMobile) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 80;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 80;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
      });
    };

    const handlePointerLeave = () => {
      if (isMobile) return;
      el.style.setProperty("--mx", "0px");
      el.style.setProperty("--my", "0px");
    };

    el.addEventListener("pointermove", handlePointerMove);
    el.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  const openGiftPackage = () => {
    if (giftOpened || giftOpening) return;

    setGiftOpening(true);
    setShowGift(true);
    setConfettiSeed((v) => v + 1);

    setTimeout(() => {
      setGiftOpened(true);
      setGiftOpening(false);
    }, 850);
  };

  const handleSurpriseClick = (idx) => {
    setOpenSurpriseIndex((prev) => (prev === idx ? null : idx));
    setConfettiSeed((v) => v + 1);
  };

  const confettiCount = isMobile ? 18 : 36;

  return (
    <div
      ref={sceneRef}
      className="min-h-screen overflow-hidden bg-[#09090f] text-white"
    >
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0px) translateX(0px) scale(1); opacity: .12; }
          50% { transform: translateY(-40px) translateX(10px) scale(1.05); opacity: .28; }
          100% { transform: translateY(0px) translateX(0px) scale(1); opacity: .12; }
        }

        @keyframes pulseGlow {
          0%,100% { box-shadow: 0 0 22px rgba(168,85,247,.25), 0 0 60px rgba(236,72,153,.08); }
          50% { box-shadow: 0 0 34px rgba(168,85,247,.42), 0 0 80px rgba(236,72,153,.16); }
        }

        @keyframes confettiFly {
          0% { opacity: 0; transform: translate(0px,0px) scale(.4) rotate(0deg); }
          10% { opacity: 1; }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(1.2) rotate(720deg); }
        }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes glowText {
          0%,100% { text-shadow: 0 0 10px rgba(255,255,255,.2), 0 0 24px rgba(244,114,182,.1); }
          50% { text-shadow: 0 0 14px rgba(255,255,255,.4), 0 0 34px rgba(192,132,252,.22); }
        }

        @keyframes popIn {
          0% { opacity: 0; transform: translateY(-6px) scale(.98); }
          100% { opacity: 1; transform: translateY(0px) scale(1); }
        }

        @keyframes twinkle {
          0%, 100% { transform: scale(0.85); opacity: 0.45; }
          50% { transform: scale(1.25); opacity: 1; }
        }

        @keyframes starTwinkle {
          0%, 100% { opacity: .2; transform: scale(1); }
          50% { opacity: .8; transform: scale(1.35); }
        }

        @media (max-width: 768px) {
          .mobile-lite {
            backdrop-filter: blur(8px) !important;
          }
          .mobile-hide {
            display: none !important;
          }
        }
      `}</style>

      <div className="relative isolate">
        <StarField isMobile={isMobile} />

        <FloatingShape
          className={`top-10 left-10 h-52 w-52 bg-fuchsia-500 ${isMobile ? "mobile-hide" : ""}`}
          style={{ animation: "floatUp 10s ease-in-out infinite" }}
        />
        <FloatingShape
          className={`top-40 right-8 h-64 w-64 bg-cyan-400 ${isMobile ? "mobile-hide" : ""}`}
          style={{ animation: "floatUp 13s ease-in-out infinite" }}
        />
        <FloatingShape
          className={`bottom-16 left-1/3 h-72 w-72 bg-pink-400 ${isMobile ? "mobile-hide" : ""}`}
          style={{ animation: "floatUp 15s ease-in-out infinite" }}
        />

        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
          <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl mobile-lite">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/50">
                Private celebration
              </p>
              <h1 className="text-lg font-semibold">For Deepika</h1>
            </div>

            <button
              onClick={() => {
                if (!audioRef.current) return;

                if (musicOn) {
                  audioRef.current.pause();
                } else {
                  audioRef.current.play().catch(() => {
                    setMusicOn(false);
                  });
                }

                setMusicOn((v) => !v);
              }}
              className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm transition hover:bg-white/20"
            >
              {musicOn ? "Music on ✦" : "Music off"}
            </button>
          </header>

          <main className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1.1fr_.9fr] lg:py-12">
            <section className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-2 text-sm text-fuchsia-100 backdrop-blur-xl mobile-lite">
                <span className="h-2 w-2 animate-pulse rounded-full bg-fuchsia-300" />
                Birthday surprise mode activated
              </div>

              <div className="space-y-4">
                <h2
                  className="max-w-2xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl"
                  style={{ animation: "glowText 3s ease-in-out infinite" }}
                >
                  {typed}
                </h2>

                <p className="max-w-xl text-base leading-7 text-white/70 sm:text-lg">
                  A cinematic birthday experience built with hidden surprises,
                  floating lights, secret reveals, and a little extra magic for
                  your special day.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <SparkleFrame>
                  <button
                    onClick={openGiftPackage}
                    className="rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-6 py-3 font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition hover:scale-[1.03]"
                    style={{
                      backgroundSize: "200% 200%",
                      animation: "shimmer 5s linear infinite",
                    }}
                  >
                    Open Surprise
                  </button>
                </SparkleFrame>

                <SparkleFrame>
                  <button
                    onClick={() => {
                      setSecretIndex((v) => (v + 1) % secretMessages.length);
                      setSecretText("");
                      setSecretFading(false);
                      setShowLetter(true);
                      setConfettiSeed((v) => v + 1);
                    }}
                    className="group relative overflow-hidden rounded-full border border-white/10 bg-white/8 px-6 py-3 font-semibold text-white/90 transition hover:bg-white/15"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Unlock hidden note
                      <span className="transition group-hover:translate-x-1">
                        ✨
                      </span>
                    </span>
                    <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/20 via-violet-500/20 to-cyan-400/20" />
                    </div>
                  </button>
                </SparkleFrame>
              </div>

              <div className="max-w-2xl rounded-[2rem] border border-white/10 bg-white/7 p-5 shadow-2xl shadow-black/25 backdrop-blur-xl mobile-lite">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/45">
                    Secret message
                  </p>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/65">
                    softly typing
                  </span>
                </div>

                <div
                  className={`relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-white/8 p-5 transition-all duration-500 ${
                    secretFading
                      ? "opacity-0 translate-y-2 blur-md"
                      : "opacity-100"
                  }`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,.12),transparent_40%)]" />
                  <p className="relative text-xl leading-8 text-white/90 sm:text-2xl">
                    {secretText}
                    <span className="ml-1 inline-block animate-pulse text-fuchsia-200">
                      ▍
                    </span>
                  </p>
                </div>
              </div>
            </section>

            <section className="relative">
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-fuchsia-500/15 via-white/5 to-cyan-400/15 blur-2xl mobile-hide" />

              <div
                className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/7 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl mobile-lite sm:p-8"
                style={{ animation: "pulseGlow 5s ease-in-out infinite" }}
              >
                <div className="mb-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                    Main surprise box
                  </p>
                  <h3 className="mt-2 text-2xl font-bold">
                    Deepika’s birthday universe
                  </h3>
                </div>

                <div className="relative mx-auto aspect-square w-full max-w-md rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#171725] to-[#0b0b12] p-5 shadow-inner shadow-black/40">
                  {!giftOpened && (
                    <button
                      onClick={openGiftPackage}
                      className={`absolute inset-0 z-30 overflow-hidden rounded-[2rem] transition-all duration-700 ${
                        giftOpening
                          ? "pointer-events-none opacity-0 scale-110"
                          : "opacity-100"
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500 via-violet-600 to-cyan-500" />
                      <div className="absolute left-1/2 top-0 h-full w-8 -translate-x-1/2 bg-white/90" />
                      <div className="absolute left-0 top-1/2 h-8 w-full -translate-y-1/2 bg-white/90" />
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="relative h-20 w-20">
                          <span className="absolute left-0 top-3 h-8 w-10 rounded-full bg-white rotate-[-25deg]" />
                          <span className="absolute right-0 top-3 h-8 w-10 rounded-full bg-white rotate-[25deg]" />
                          <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
                        </div>
                      </div>
                    </button>
                  )}

                  <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 text-7xl animate-bounce">🎁</div>
                    <p className="text-sm uppercase tracking-[0.4em] text-white/45">
                      Surprise Revealed
                    </p>
                  </div>

                  {showGift && (
                    <ConfettiBurst seed={confettiSeed} count={confettiCount} />
                  )}
                </div>

                <div
                  className={`mt-6 grid gap-3 sm:grid-cols-2 transition-all duration-700 ${
                    giftOpened
                      ? "opacity-100 blur-0"
                      : "pointer-events-none opacity-0 blur-md"
                  }`}
                >
                  {surpriseCards.map((item, idx) => {
                    const isOpen = openSurpriseIndex === idx;

                    return (
                      <button
                        key={item.title}
                        onClick={() => handleSurpriseClick(idx)}
                        className={`group rounded-2xl border border-white/10 bg-white/6 p-4 text-left text-sm leading-6 text-white/80 transition duration-300 hover:-translate-y-1 hover:bg-white/10 ${
                          isOpen ? "ring-2 ring-fuchsia-400/40" : ""
                        }`}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs uppercase tracking-[0.3em] text-white/35">
                            {item.title}
                          </span>
                          <span className="text-lg transition duration-300 group-hover:scale-125">
                            {isOpen ? "▾" : "▸"}
                          </span>
                        </div>
                        <div className="text-white/80">{item.preview}</div>
                        <div
                          className={`overflow-hidden transition-all duration-500 ease-out ${
                            isOpen
                              ? "mt-3 max-h-40 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div
                            className="rounded-xl border border-white/10 bg-black/20 p-3 text-white/90"
                            style={
                              isOpen
                                ? { animation: "popIn 0.35s ease-out" }
                                : {}
                            }
                          >
                            {item.reveal}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <MemoryCarousel photos={memoryPhotos} isMobile={isMobile} />
              </div>
            </section>
          </main>
        </div>
      </div>

      {showLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-md mobile-lite">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#11111a] p-6 shadow-2xl shadow-black/50 sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-400/10" />

            <div className="relative z-10">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/40">
                    Hidden Note
                  </p>
                  <h3 className="mt-2 text-4xl font-black bg-gradient-to-r from-pink-300 via-fuchsia-200 to-cyan-200 bg-clip-text text-transparent">
                    Dear Deepika ✨
                  </h3>
                </div>
                <div className="text-5xl animate-pulse">💖</div>
              </div>

              <div className="space-y-5 text-base leading-8 text-white/75 sm:text-lg">
                <p>
                  Some people enter life quietly and still manage to make
                  everything brighter. You are one of those people.
                </p>

                <p>
                  This little universe of lights, colors, sparkles, and
                  surprises was created for one reason — to make you smile even
                  for a moment.
                </p>

                <p>
                  Never forget how special your energy is. Your laughter, your
                  kindness, your presence... they leave magic everywhere.
                </p>

                <div className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 p-5 backdrop-blur-xl mobile-lite">
                  <p className="text-center text-xl font-semibold text-white">
                    “You deserve every beautiful thing this world can offer.”
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setConfettiSeed((v) => v + 1);
                    alert("Happy Birthday Bihari jii 🎉");
                  }}
                  className="rounded-full bg-white px-5 py-3 font-semibold text-black transition hover:scale-[1.03]"
                >
                  More magic ✨
                </button>

                <button
                  onClick={() => setShowLetter(false)}
                  className="rounded-full border border-white/15 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/15"
                >
                  Close note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
