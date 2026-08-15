"use client";

import { useActionState } from "react";
import type { SkillFormState } from "@/lib/actions/skills";

const categories = ["Languages", "Frontend", "Backend", "Database", "Auth & Cloud", "Tools"];

type SkillFormProps = {
  action: (state: SkillFormState, formData: FormData) => Promise<SkillFormState>;
  defaultValues?: { name?: string; category?: string; order?: number };
};

export function SkillForm({ action, defaultValues }: SkillFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <form action={formAction} className="flex max-w-md flex-col gap-6">
      <div>
        <label htmlFor="name" className="label-mono text-muted">Name</label>
        <input
          id="name"
          name="name"
          defaultValue={defaultValues?.name}
          className="mt-2 w-full border-0 border-b border-border bg-transparent py-2 text-sm focus:border-accent focus:outline-none"
        />
        {state.errors?.name && <p className="mt-1 text-xs text-accent">{state.errors.name}</p>}
      </div>

      <div>
        <label htmlFor="category" className="label-mono text-muted">Category</label>
        <select
          id="category"
          name="category"
          defaultValue={defaultValues?.category ?? categories[0]}
          className="mt-2 w-full border-0 border-b border-border bg-transparent py-2 text-sm focus:border-accent focus:outline-none"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="order" className="label-mono text-muted">Display order</label>
        <input
          id="order"
          name="order"
          type="number"
          defaultValue={String(defaultValues?.order ?? 0)}
          className="mt-2 w-full border-0 border-b border-border bg-transparent py-2 text-sm focus:border-accent focus:outline-none"
        />
      </div>

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