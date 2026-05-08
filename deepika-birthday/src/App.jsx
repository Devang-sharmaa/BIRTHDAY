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
      className={`absolute rounded-full blur-2xl opacity-25 ${className}`}
      style={style}
    />
  );
}

function ConfettiBurst({ seed, count = 20 }) {
  const pieces = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 100 + Math.random() * 90;

      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        delay: Math.random() * 0.3,
        size: 4 + Math.random() * 6,
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
            fontSize: p.size * 1.2,
            animation: `confettiFly 1.5s ease-out ${p.delay}s forwards`,
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
  return <div className={`relative inline-flex ${className}`}>{children}</div>;
}

function MemoryCarousel({ photos, isMobile }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => {
        setIndex((prev) => (prev + 1) % photos.length);
      },
      isMobile ? 6000 : 4500,
    );

    return () => clearInterval(timer);
  }, [photos.length, isMobile]);

  const goTo = (next) => {
    const total = photos.length;
    setIndex((next + total) % total);
  };

  return (
    <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/5 p-4 mobile-lite sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">
            Memory carousel
          </p>
          <h4 className="mt-1 text-lg font-semibold text-white/90">
            Little moments
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => goTo(index - 1)}
            className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm"
          >
            ←
          </button>

          <button
            onClick={() => goTo(index + 1)}
            className="rounded-full border border-white/10 bg-white/10 px-3 py-2 text-sm"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#10101a]">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {photos.map((photo, i) => (
            <div key={photo.src + i} className="min-w-full">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-sm text-white/95">{photo.caption}</p>
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StarField({ isMobile }) {
  const stars = useMemo(
    () =>
      Array.from({ length: isMobile ? 14 : 34 }, (_, i) => ({
        top: `${(i * 17) % 100}%`,
        left: `${(i * 29) % 100}%`,
        size: 2 + (i % 2),
        delay: `${(i % 6) * 0.4}s`,
      })),
    [isMobile],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((item, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white/70"
          style={{
            top: item.top,
            left: item.left,
            width: item.size,
            height: item.size,
            animation: `starTwinkle 5s ease-in-out ${item.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function BirthdaySurpriseWebsite() {
  const [showLetter, setShowLetter] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [secretIndex, setSecretIndex] = useState(0);
  const [secretText, setSecretText] = useState("");
  const [typed, setTyped] = useState("");
  const [openSurpriseIndex, setOpenSurpriseIndex] = useState(null);
  const [giftOpened, setGiftOpened] = useState(false);
  const [giftOpening, setGiftOpening] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const audioRef = useRef(null);

  const fullText = "Happy Birthday, Deepika ✨";

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(media.matches);

    update();

    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.35;
    }
  }, []);

  useEffect(() => {
    let index = 0;

    const t = setInterval(() => {
      index += 1;
      setTyped(fullText.slice(0, index));

      if (index >= fullText.length) clearInterval(t);
    }, 90);

    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let typingTimer;

    const message = secretMessages[secretIndex];

    if (secretText.length < message.length) {
      typingTimer = window.setTimeout(() => {
        setSecretText(message.slice(0, secretText.length + 1));
      }, 65);
    } else {
      setTimeout(() => {
        setSecretIndex((prev) => (prev + 1) % secretMessages.length);
        setSecretText("");
      }, 2200);
    }

    return () => clearTimeout(typingTimer);
  }, [secretIndex, secretText]);

  const openGiftPackage = () => {
    if (giftOpened || giftOpening) return;

    setGiftOpening(true);
    setShowGift(true);

    setTimeout(() => {
      setGiftOpened(true);
      setGiftOpening(false);
    }, 700);
  };

  const handleSurpriseClick = (idx) => {
    setOpenSurpriseIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#09090f] text-white">
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0px); opacity: .12; }
          50% { transform: translateY(-30px); opacity: .22; }
          100% { transform: translateY(0px); opacity: .12; }
        }

        @keyframes confettiFly {
          0% { opacity: 0; transform: translate(0px,0px) scale(.4); }
          10% { opacity: 1; }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(1); }
        }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes glowText {
          0%,100% { text-shadow: 0 0 10px rgba(255,255,255,.2); }
          50% { text-shadow: 0 0 16px rgba(255,255,255,.35); }
        }

        @keyframes starTwinkle {
          0%, 100% { opacity: .2; transform: scale(1); }
          50% { opacity: .7; transform: scale(1.2); }
        }

        @media (max-width: 768px) {
          .mobile-lite {
            backdrop-filter: blur(4px) !important;
          }

          .mobile-hide {
            display: none !important;
          }
        }
      `}</style>

      <StarField isMobile={isMobile} />

      <FloatingShape
        className={`top-10 left-10 h-52 w-52 bg-fuchsia-500 ${
          isMobile ? "mobile-hide" : ""
        }`}
        style={{ animation: "floatUp 10s ease-in-out infinite" }}
      />

      <FloatingShape
        className={`bottom-16 left-1/3 h-72 w-72 bg-pink-400 ${
          isMobile ? "mobile-hide" : ""
        }`}
        style={{ animation: "floatUp 15s ease-in-out infinite" }}
      />

      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 mobile-lite">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/50">
              Private celebration
            </p>

            <h1 className="text-lg font-semibold">For Deepika</h1>
          </div>

          <button
            onClick={async () => {
              if (!audioRef.current) return;

              try {
                if (musicOn) {
                  audioRef.current.pause();
                  setMusicOn(false);
                } else {
                  await audioRef.current.play();
                  setMusicOn(true);
                }
              } catch (err) {
                setMusicOn(false);
              }
            }}
            className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm"
          >
            {musicOn ? "Music on ✦" : "Music off"}
          </button>
        </header>

        <main className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1.1fr_.9fr]">
          <section className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-2 text-sm text-fuchsia-100 mobile-lite">
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
                floating lights, and beautiful memories.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <SparkleFrame>
                <button
                  onClick={openGiftPackage}
                  className="rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-6 py-3 font-semibold text-white"
                  style={{
                    backgroundSize: "200% 200%",
                    animation: "shimmer 5s linear infinite",
                  }}
                >
                  Open Surprise
                </button>
              </SparkleFrame>

              <button
                onClick={() => {
                  setSecretIndex((v) => (v + 1) % secretMessages.length);
                  setSecretText("");
                  setShowLetter(true);
                }}
                className="rounded-full border border-white/10 bg-white/10 px-6 py-3 font-semibold text-white/90"
              >
                Unlock hidden note ✨
              </button>
            </div>

            <div className="max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 p-5 mobile-lite">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-white/45">
                Secret message
              </p>

              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                <p className="text-xl leading-8 text-white/90 sm:text-2xl">
                  {secretText}
                  <span className="ml-1 inline-block animate-pulse text-fuchsia-200">
                    ▍
                  </span>
                </p>
              </div>
            </div>
          </section>

          <section className="relative">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-6 mobile-lite sm:p-8">
              <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.35em] text-white/45">
                  Main surprise box
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  Deepika’s birthday universe
                </h3>
              </div>

              <div className="relative mx-auto aspect-square w-full max-w-md rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#171725] to-[#0b0b12] p-5">
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
                  </button>
                )}

                <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 text-7xl animate-bounce">🎁</div>

                  <p className="text-sm uppercase tracking-[0.4em] text-white/45">
                    Surprise Revealed
                  </p>
                </div>

                {showGift && <ConfettiBurst seed={1} count={12} />}
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
                      className={`rounded-2xl border border-white/10 bg-white/6 p-4 text-left text-sm leading-6 text-white/80 ${
                        isOpen ? "ring-2 ring-fuchsia-400/40" : ""
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs uppercase tracking-[0.3em] text-white/35">
                          {item.title}
                        </span>

                        <span className="text-lg">{isOpen ? "▾" : "▸"}</span>
                      </div>

                      <div>{item.preview}</div>

                      {isOpen && (
                        <div className="mt-3 rounded-xl border border-white/10 bg-black/20 p-3 text-white/90">
                          {item.reveal}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <MemoryCarousel photos={memoryPhotos} isMobile={isMobile} />
            </div>
          </section>
        </main>
      </div>

      {showLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#11111a] p-6 sm:p-8">
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
                  surprises was created for one reason — to make you smile.
                </p>

                <div className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 p-5">
                  <p className="text-center text-xl font-semibold text-white">
                    “You deserve every beautiful thing this world can offer.”
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    alert("Happy Birthday Bihari jii 🎉");
                  }}
                  className="rounded-full bg-white px-5 py-3 font-semibold text-black"
                >
                  More magic ✨
                </button>

                <button
                  onClick={() => setShowLetter(false)}
                  className="rounded-full border border-white/15 bg-white/10 px-5 py-3 font-semibold text-white"
                >
                  Close note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <audio ref={audioRef} src="/music.mp3" loop preload="none" />
    </div>
  );
}
