"use client";

import { useActionState } from "react";
import type { CertificationFormState } from "@/lib/actions/certifications";

type CertificationFormProps = {
  action: (state: CertificationFormState, formData: FormData) => Promise<CertificationFormState>;
  defaultValues?: { title?: string; issuer?: string; issueDate?: Date; credentialUrl?: string | null; order?: number };
};

function toDateInput(d?: Date) {
  if (!d) return "";
  return new Date(d).toISOString().split("T")[0];
}

export function CertificationForm({ action, defaultValues }: CertificationFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-6">
      <Field name="title" label="Title" defaultValue={defaultValues?.title} error={state.errors?.title} />
      <Field name="issuer" label="Issuer" defaultValue={defaultValues?.issuer} error={state.errors?.issuer} />
      <Field
        name="issueDate"
        label="Issue date"
        type="date"
        defaultValue={toDateInput(defaultValues?.issueDate)}
        error={state.errors?.issueDate}
      />
      <Field name="credentialUrl" label="Credential URL" defaultValue={defaultValues?.credentialUrl ?? ""} error={state.errors?.credentialUrl} />
      <Field name="order" label="Display order" type="number" defaultValue={String(defaultValues?.order ?? 0)} />

      <button
        type="submit"
        disabled={isPending}
        className="label-mono self-start border border-ink bg-ink px-6 py-3 text-paper transition-colors hover:bg-accent hover:border-accent disabled:opacity-50"
      >
        {isPending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  defaultValue,
  error
}: {
  name: string;
  label: string;
  type?: string;
  defaultValue?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="label-mono text-muted">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="mt-2 w-full border-0 border-b border-border bg-transparent py-2 text-sm focus:border-accent focus:outline-none"
      />
      {error && <p className="mt-1 text-xs text-accent">{error}</p>}
    </div>
  );
}