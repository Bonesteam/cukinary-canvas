"use client";
import { useState } from "react";

export function LanguageSwitcher() {
  const [lang, setLang] = useState("en");
  return (
    <div style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
      <span style={{ color: "var(--color-muted)", fontSize: 12 }}>Lang:</span>
      <button className="button ghost" onClick={() => setLang("en")} aria-pressed={lang === "en"}>EN</button>
      <button className="button ghost" onClick={() => setLang("uk")} aria-pressed={lang === "uk"}>UK</button>
    </div>
  );
}
