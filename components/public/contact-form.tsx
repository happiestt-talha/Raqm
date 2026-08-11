"use client";

import { useActionState } from "react";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field name="name" label="Your name" error={state.errors?.name} />
        <Field name="email" label="Your email" type="email" error={state.errors?.email} />
      </div>
      <Field name="projectType" label="Project type (e.g. Web app, SaaS, Portfolio)" />
      <Field name="message" label="Tell me about your project" as="textarea" error={state.errors?.message} />

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="label-mono border border-ink bg-ink px-6 py-3 text-paper transition-colors hover:bg-accent hover:border-accent disabled:opacity-50"
        >
          {isPending ? "Sending…" : "Send message ↗"}
        </button>
        {state.status === "success" && (
          <p className="text-sm text-ink/70" role="status">{state.message}</p>
        )}
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  as = "input",
  error
}: {
  name: string;
  label: string;
  type?: string;
  as?: "input" | "textarea";
  error?: string;
}) {
  const id = `field-${name}`;
  const baseClasses =
    "w-full border-0 border-b border-border bg-transparent py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none";

  return (
    <div>
      <label htmlFor={id} className="label-mono text-muted">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea id={id} name={name} rows={4} className={`${baseClasses} mt-2 resize-none`} />
      ) : (
        <input id={id} name={name} type={type} className={`${baseClasses} mt-2`} />
      )}
      {error && (
        <p className="mt-1 text-xs text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}