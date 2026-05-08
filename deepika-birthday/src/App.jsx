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

function FloatingShape({ className, style }) {
  return (
    <div
      className={`absolute rounded-full blur-2xl opacity-40 ${className}`}
      style={style}
    />
  );
}

function ConfettiBurst({ seed }) {
  const pieces = useMemo(() => {
    return Array.from({ length: 140 }, (_, i) => {
      const angle = (i / 140) * Math.PI * 2;
      const radius = 220 + Math.random() * 180;

      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        delay: Math.random() * 0.5,
        size: 6 + Math.random() * 12,
        shape: i % 9 === 0 ? "❤" : i % 7 === 0 ? "✨" : "",
      };
    });
  }, [seed]);

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
            fontSize: p.size * 1.4,
            animation: `confettiFly 2.2s cubic-bezier(.12,.8,.18,1) ${p.delay}s forwards`,
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

export default function BirthdaySurpriseWebsite() {
  const [showLetter, setShowLetter] = useState(false);
  const [showGift, setShowGift] = useState(false);

  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef(null);

  const [secretIndex, setSecretIndex] = useState(0);
  const [secretText, setSecretText] = useState("");
  const [secretFading, setSecretFading] = useState(false);

  const [confettiSeed, setConfettiSeed] = useState(1);
  const [typed, setTyped] = useState("");

  const [openSurpriseIndex, setOpenSurpriseIndex] = useState(null);

  const [giftOpened, setGiftOpened] = useState(false);
  const [giftOpening, setGiftOpening] = useState(false);

  const fullText = "Happy Birthday, Deepika ✨";

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

    const t = setInterval(() => {
      index += 1;
      setTyped(fullText.slice(0, index));

      if (index >= fullText.length) clearInterval(t);
    }, 90);

    return () => clearInterval(t);
  }, []);

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
        secretText.length < 10 ? 95 : 55,
      );
    } else {
      pauseTimer = window.setTimeout(() => {
        setSecretFading(true);

        fadeTimer = window.setTimeout(() => {
          setSecretIndex((prev) => (prev + 1) % secretMessages.length);
          setSecretText("");
          setSecretFading(false);
        }, 600);
      }, 2600);
    }

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(pauseTimer);
      clearTimeout(fadeTimer);
    };
  }, [secretIndex, secretText]);

  const openGiftPackage = () => {
    if (giftOpened || giftOpening) return;

    setGiftOpening(true);
    setShowGift(true);

    setConfettiSeed((v) => v + 1);

    setTimeout(() => {
      setGiftOpened(true);
      setGiftOpening(false);
    }, 900);
  };

  const handleSurpriseClick = (idx) => {
    setOpenSurpriseIndex((prev) => (prev === idx ? null : idx));

    setConfettiSeed((v) => v + 1);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#09090f] text-white">
      <audio ref={audioRef} loop preload="auto">
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: .15;
          }

          50% {
            transform: translateY(-40px) translateX(10px) scale(1.08);
            opacity: .35;
          }

          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: .15;
          }
        }

        @keyframes pulseGlow {
          0%,100% {
            box-shadow:
              0 0 30px rgba(168,85,247,.35),
              0 0 90px rgba(236,72,153,.10);
          }

          50% {
            box-shadow:
              0 0 50px rgba(168,85,247,.6),
              0 0 120px rgba(236,72,153,.22);
          }
        }

        @keyframes confettiFly {
          0% {
            opacity: 0;
            transform:
              translate(0px,0px)
              scale(.4)
              rotate(0deg);
          }

          10% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform:
              translate(var(--tx), var(--ty))
              scale(1.3)
              rotate(1080deg);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: 0% 50%;
          }

          100% {
            background-position: 200% 50%;
          }
        }

        @keyframes glowText {
          0%,100% {
            text-shadow:
              0 0 12px rgba(255,255,255,.25),
              0 0 30px rgba(244,114,182,.15);
          }

          50% {
            text-shadow:
              0 0 16px rgba(255,255,255,.5),
              0 0 44px rgba(192,132,252,.32);
          }
        }

        @keyframes popIn {
          0% {
            opacity: 0;
            transform: translateY(-6px) scale(.98);
          }

          100% {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }
        }
      `}</style>

      <div className="relative isolate">
        <FloatingShape
          className="top-10 left-10 h-52 w-52 bg-fuchsia-500"
          style={{ animation: "floatUp 10s ease-in-out infinite" }}
        />

        <FloatingShape
          className="top-40 right-8 h-64 w-64 bg-cyan-400"
          style={{ animation: "floatUp 13s ease-in-out infinite" }}
        />

        <FloatingShape
          className="bottom-16 left-1/3 h-72 w-72 bg-pink-400"
          style={{ animation: "floatUp 15s ease-in-out infinite" }}
        />

        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
          <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
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
              <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-4 py-2 text-sm text-fuchsia-100 backdrop-blur-xl">
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
              </div>

              <div className="max-w-2xl rounded-[2rem] border border-white/10 bg-white/7 p-5 shadow-2xl shadow-black/25 backdrop-blur-xl">
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
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-fuchsia-500/15 via-white/5 to-cyan-400/15 blur-2xl" />

              <div
                className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/7 p-6 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-8"
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

                  {showGift && <ConfettiBurst seed={confettiSeed} />}
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
              </div>
            </section>
          </main>
        </div>
      </div>

      {showLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-md">
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

                <div className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 p-5 backdrop-blur-xl">
                  <p className="text-center text-xl font-semibold text-white">
                    “You deserve every beautiful thing this world can offer.”
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() => setConfettiSeed((v) => v + 1)}
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
