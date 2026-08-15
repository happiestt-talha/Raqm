"use client";

import { useFormState, useFormStatus } from "react-dom";
import type { ExperienceFormState } from "@/lib/actions/experience";

type ExperienceFormProps = {
  action: (state: ExperienceFormState, formData: FormData) => Promise<ExperienceFormState>;
  defaultValues?: {
    company?: string;
    role?: string;
    location?: string | null;
    startDate?: Date;
    endDate?: Date | null;
    bullets?: string[];
    order?: number;
  };
};

function toDateInput(d?: Date | null) {
  if (!d) return "";
  return new Date(d).toISOString().split("T")[0];
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="label-mono self-start border border-ink bg-ink px-6 py-3 text-paper transition-colors hover:bg-accent hover:border-accent disabled:opacity-50"
    >
      {pending ? "Saving…" : "Save"}
    </button>
  );
}

export function ExperienceForm({ action, defaultValues }: ExperienceFormProps) {
  const [state, formAction] = useFormState(action, {});

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-6">
      <div className="grid grid-cols-2 gap-6">
        <TextField name="company" label="Company" defaultValue={defaultValues?.company} error={state.errors?.company} />
        <TextField name="role" label="Role" defaultValue={defaultValues?.role} error={state.errors?.role} />
      </div>

      <TextField name="location" label="Location" defaultValue={defaultValues?.location ?? ""} />

      <div className="grid grid-cols-2 gap-6">
        <TextField
          name="startDate"
          label="Start date"
          type="date"
          defaultValue={toDateInput(defaultValues?.startDate)}
          error={state.errors?.startDate}
        />
        <TextField
          name="endDate"
          label="End date (leave empty if current)"
          type="date"
          defaultValue={toDateInput(defaultValues?.endDate)}
        />
      </div>

      <div>
        <label htmlFor="bullets" className="label-mono text-muted">
          Bullet points (one per line)
        </label>
        <textarea
          id="bullets"
          name="bullets"
          rows={5}
          defaultValue={defaultValues?.bullets?.join("\n")}
          className="mt-2 w-full border border-border bg-paper p-3 text-sm focus:border-accent focus:outline-none"
        />
        {state.errors?.bullets && <p className="mt-1 text-xs text-accent">{state.errors.bullets}</p>}
      </div>

      <TextField
        name="order"
        label="Display order (lower = higher up)"
        type="number"
        defaultValue={String(defaultValues?.order ?? 0)}
      />

      <SubmitButton />
    </form>
  );
}

function TextField({
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