"use client";

import { useState } from "react";
import Image from "next/image";

type ImageUploadProps = {
  name: string;
  label: string;
  defaultValue?: string;
  error?: string;
};

export function ImageUpload({ name, label, defaultValue, error: externalError }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultValue ?? null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayError = error || externalError;

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Upload failed");
        return;
      }

      setPreview(data.url);
    } catch {
      setError("Upload failed — check your connection.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div>
      <label className="label-mono text-muted">{label}</label>

      {/* This hidden input is what actually gets submitted with the form */}
      <input type="hidden" name={name} value={preview ?? ""} />

      <div className="mt-2 flex items-center gap-4">
        {preview && (
          <div className="relative h-20 w-28 shrink-0 overflow-hidden border border-border bg-ink/5">
            <Image src={preview} alt="Preview" fill sizes="112px" className="object-cover" />
          </div>
        )}

        <label className="label-mono cursor-pointer border border-border px-4 py-2 text-ink/70 hover:border-accent hover:text-accent">
          {isUploading ? "Uploading…" : preview ? "Replace image" : "Upload image"}
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={isUploading} />
        </label>
      </div>

      {displayError && <p className="mt-2 text-xs text-accent">{displayError}</p>}
    </div>
  );
}