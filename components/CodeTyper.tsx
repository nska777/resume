"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Props = {
  lines: string[];
  speedMs?: number;
  startDelayMs?: number;
  className?: string;
};

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

type Step =
  | { kind: "type"; text: string; speedMs?: number }
  | { kind: "pause"; ms: number }
  | { kind: "erase"; count: number; speedMs?: number; human?: boolean }
  | { kind: "shake"; ms: number };

function jitter(ms: number, spread = 0.35) {
  const k = 1 + (Math.random() * 2 - 1) * spread; // 0.65..1.35
  return Math.max(6, Math.round(ms * k));
}

/**
 * Очень простой подсветчик:
 * - <img, /> — бирюзовый
 * - атрибуты height= src= alt= — светло-фиолетовый
 * - строки "..." — зелёный
 */
function highlightCode(text: string) {
  // делаем легкий "lexer" по символам, но с простыми правилами
  const nodes: React.ReactNode[] = [];
  let i = 0;

  const push = (chunk: string, cls: string) => {
    if (!chunk) return;
    nodes.push(
      <span key={`${nodes.length}-${i}`} className={cls}>
        {chunk}
      </span>,
    );
  };

  while (i < text.length) {
    const ch = text[i];

    // string "...."
    if (ch === '"') {
      let j = i + 1;
      while (j < text.length && text[j] !== '"') j++;
      // если закрывающей кавычки еще нет — берем до конца
      const str = text.slice(i, Math.min(j + 1, text.length));
      push(str, "text-emerald-200/85");
      i += str.length;
      continue;
    }

    // tag parts: <img or </ or />
    if (ch === "<") {
      // до первого пробела или >
      let j = i + 1;
      while (j < text.length && ![" ", ">", "\n", "\t"].includes(text[j])) j++;
      const tag = text.slice(i, j);
      push(tag, "text-cyan-200/85");
      i = j;
      continue;
    }

    if (ch === "/" && text[i + 1] === ">") {
      push("/>", "text-cyan-200/85");
      i += 2;
      continue;
    }

    // attribute name: something=
    // берем слово перед "="
    if (/[a-zA-Z]/.test(ch)) {
      let j = i;
      while (j < text.length && /[a-zA-Z0-9_-]/.test(text[j])) j++;

      if (text[j] === "=") {
        const name = text.slice(i, j);
        push(name, "text-violet-200/80");
        push("=", "text-white/40");
        i = j + 1;
        continue;
      }
    }

    // default
    push(ch, "text-emerald-100/70");
    i += 1;
  }

  return nodes;
}

export default function CodeTyper({
  lines,
  speedMs = 32, // помедленнее по умолчанию
  startDelayMs = 500,
  className,
}: Props) {
  const full = useMemo(() => lines.join("\n"), [lines]);

  // Разрезаем по alt="фото (точка сценария)
  const parts = useMemo(() => {
    const marker = `alt="фото`;
    const idx = full.indexOf(marker);

    if (idx < 0) {
      return { hasMarker: false as const, head: full, tail: "" };
    }

    const head = full.slice(0, idx + marker.length);
    let tail = full.slice(idx + marker.length);

    // ✅ АНТИДУБЛЬ:
    // Если пользователь случайно уже дописал " замечательного человека" в lines —
    // убираем это из tail, чтобы сценарий не продублировал.
    // Удаляем в начале tail: пробелы + замечательного человека + опциональная кавычка
    tail = tail.replace(/^\s*замечательного человека"?/u, "");

    // Если tail начинается с '"' (бывает когда alt="фото" уже закрыли),
    // убираем первую кавычку — сценарий сам поставит правильную.
    tail = tail.replace(/^\s*"/, "");

    return { hasMarker: true as const, head, tail };
  }, [full]);

  const [out, setOut] = useState("");
  const outRef = useRef("");
  const tRef = useRef<number | null>(null);

  const [shakeOn, setShakeOn] = useState(false);

  function setOutSafe(v: string) {
    outRef.current = v;
    setOut(v);
  }

  function clearTimer() {
    if (tRef.current) {
      window.clearTimeout(tRef.current);
      tRef.current = null;
    }
  }

  useEffect(() => {
    clearTimer();
    setOutSafe("");
    setShakeOn(false);

    // Если marker нет — печатаем как раньше, просто полностью
    if (!parts.hasMarker) {
      let i = 0;
      const start = window.setTimeout(() => {
        const tick = () => {
          i++;
          setOutSafe(parts.head.slice(0, i));
          if (i < parts.head.length) {
            tRef.current = window.setTimeout(tick, jitter(speedMs, 0.2));
          }
        };
        tick();
      }, startDelayMs);

      return () => {
        window.clearTimeout(start);
        clearTimer();
      };
    }

    const steps: Step[] = [
      // печать до alt="фото
      { kind: "type", text: parts.head, speedMs },

      // пауза 1 сек
      { kind: "pause", ms: 900 },

      // "пока нет"
      { kind: "type", text: " пока нет", speedMs: speedMs + 10 },
      { kind: "pause", ms: 800 },
      {
        kind: "erase",
        count: " пока нет".length,
        speedMs: speedMs - 6,
        human: true,
      },

      // "файл повреж" + shake
      { kind: "type", text: " файл повреж", speedMs: speedMs + 10 },
      { kind: "pause", ms: 250 },
      { kind: "shake", ms: 420 },
      { kind: "pause", ms: 650 },
      {
        kind: "erase",
        count: " файл повреж".length,
        speedMs: speedMs - 6,
        human: true,
      },

      // финал (всегда один раз)
      { kind: "type", text: ` замечательного человека"` + parts.tail, speedMs },
    ];

    const start = window.setTimeout(() => {
      let si = 0;

      const runStep = () => {
        const step = steps[si];
        if (!step) return;

        if (step.kind === "pause") {
          si++;
          tRef.current = window.setTimeout(runStep, step.ms);
          return;
        }

        if (step.kind === "shake") {
          setShakeOn(true);
          tRef.current = window.setTimeout(() => {
            setShakeOn(false);
            si++;
            runStep();
          }, step.ms);
          return;
        }

        if (step.kind === "type") {
          const base = outRef.current;
          let i = 0;

          const tick = () => {
            i++;
            setOutSafe(base + step.text.slice(0, i));
            if (i < step.text.length) {
              const ms = step.speedMs ?? speedMs;
              tRef.current = window.setTimeout(tick, jitter(ms, 0.25));
            } else {
              si++;
              tRef.current = window.setTimeout(runStep, 0);
            }
          };

          tick();
          return;
        }

        if (step.kind === "erase") {
          let left = step.count;

          const tick = () => {
            const cur = outRef.current;
            if (!cur || left <= 0) {
              si++;
              tRef.current = window.setTimeout(runStep, 0);
              return;
            }

            // ✅ Реалистичный backspace:
            // иногда стираем 1, иногда 2 символа, редко — пауза
            let del = 1;
            if (step.human) {
              const r = Math.random();
              if (r > 0.86) del = 2;
              if (r > 0.95) del = 3;
            }

            del = Math.min(del, left);
            left -= del;

            setOutSafe(cur.slice(0, Math.max(0, cur.length - del)));

            const ms = step.speedMs ?? speedMs;
            const pauseChance = step.human ? Math.random() > 0.92 : false;
            tRef.current = window.setTimeout(
              tick,
              pauseChance ? jitter(ms + 120, 0.2) : jitter(ms, 0.45),
            );
          };

          tick();
          return;
        }
      };

      runStep();
    }, startDelayMs);

    return () => {
      window.clearTimeout(start);
      clearTimer();
    };

    // ✅ фикс ошибки: deps всегда одинаковые примитивы
  }, [parts.hasMarker, parts.head, parts.tail, speedMs, startDelayMs]);

  return (
    <div
      className={cn(
        "relative rounded-[22px] border border-white/10 bg-white/5 p-6",
        "shadow-[0_25px_90px_-50px_rgba(0,0,0,0.65)] backdrop-blur",
        shakeOn ? "code-shake" : "",
        className,
      )}
    >
      {/* keyframes для shake */}
      <style jsx global>{`
        @keyframes codeShake {
          0% {
            transform: translate3d(0, 0, 0);
          }
          15% {
            transform: translate3d(-1px, 0px, 0);
          }
          30% {
            transform: translate3d(2px, 1px, 0);
          }
          45% {
            transform: translate3d(-2px, -1px, 0);
          }
          60% {
            transform: translate3d(2px, 0px, 0);
          }
          75% {
            transform: translate3d(-1px, 1px, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .code-shake {
          animation: codeShake 420ms ease-in-out;
        }
      `}</style>

      <pre className="m-0 whitespace-pre-wrap break-words font-mono text-[18px] md:text-[20px] leading-[1.75]">
        <code>
          {highlightCode(out)}
          <span className="ml-0.5 inline-block h-[1.15em] w-[10px] translate-y-[2px] animate-pulse rounded-[2px] bg-emerald-200/70" />
        </code>
      </pre>

      {/* лёгкое свечение */}
      <div className="pointer-events-none absolute -inset-6 -z-10 opacity-50 [filter:blur(22px)]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_60%_40%,rgba(16,185,129,0.28),transparent_55%),radial-gradient(circle_at_30%_60%,rgba(56,189,248,0.16),transparent_55%)]" />
      </div>
    </div>
  );
}
