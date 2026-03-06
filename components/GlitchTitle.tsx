"use client";

type Props = {
  text: string;
  className?: string;
};

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

export default function GlitchTitle({ text, className }: Props) {
  return (
    <span
      className={cn("glitchLoop inline-block select-none", className)}
      data-text={text}
      aria-label={text}
    >
      {text}
      <span className="glitchScan" aria-hidden="true" />
    </span>
  );
}
