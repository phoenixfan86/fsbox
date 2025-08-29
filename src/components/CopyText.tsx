"use client";

import { useState } from "react";

type CopyTextProps = {
  text: string;
  label: string;
};

export default function CopyText({ text, label }: CopyTextProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Не вдалося скопіювати", err);
    }
  };

  return (
    <span
      onClick={handleCopy}
      className="cursor-pointer !text-(--color-1) hover:underline"
      aria-label={`${label} ${text}`}
    >
      {copied ? "✅ Скопійовано!" : text}
    </span>
  );
}
