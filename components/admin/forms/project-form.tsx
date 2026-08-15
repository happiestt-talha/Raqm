"use client";

import { useActionState } from "react";
import type { ProjectFormState } from "@/lib/actions/projects";

type ProjectFormProps = {
  action: (state: ProjectFormState, formData: FormData) => Promise<ProjectFormState>;
  defaultValues?: {
    title?: string;
    slug?: string;
    tagline?: string;
    description?: string;
    coverImage?: string | null;
    tags?: string[];
    liveUrl?: string | null;
    repoUrl?: string | null;
    featured?: boolean;
    order?: number;
  };
};

export function ProjectForm({ action, defaultValues }: ProjectFormProps) {
  const [state, formAction, isPending] = useActionState(action, {});

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-6">
      <div className="grid grid-cols-2 gap-6">
        <TextField name="title" label="Title" defaultValue={defaultValues?.title} error={state.errors?.title} />
        <TextField
          name="slug"
          label="Slug (url-friendly, e.g. cric-v-coach)"
          defaultValue={defaultValues?.slug}
          error={state.errors?.slug}
        />
      </div>

      <TextField name="tagline" label="Tagline (one line)" defaultValue={defaultValues?.tagline} error={state.errors?.tagline} />

      <div>
        <label htmlFor="description" className="label-mono text-muted">Description</label>
        <textarea
          id="description"
          name="description"
          rows={5}
          defaultValue={defaultValues?.description}
          className="mt-2 w-full border border-border bg-paper p-3 text-sm focus:border-accent focus:outline-none"
        />
        {state.errors?.description && <p className="mt-1 text-xs text-accent">{state.errors.description}</p>}
      </div>

      <TextField name="coverImage" label="Cover image URL" defaultValue={defaultValues?.coverImage ?? ""} error={state.errors?.coverImage} />
      <TextField name="tags" label="Tags (comma-separated)" defaultValue={defaultValues?.tags?.join(", ")} />

      <div className="grid grid-cols-2 gap-6">
        <TextField name="liveUrl" label="Live URL" defaultValue={defaultValues?.liveUrl ?? ""} error={state.errors?.liveUrl} />
        <TextField name="repoUrl" label="Repo URL" defaultValue={defaultValues?.repoUrl ?? ""} error={state.errors?.repoUrl} />
      </div>

      <TextField name="order" label="Display order" type="number" defaultValue={String(defaultValues?.order ?? 0)} />

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="featured" defaultChecked={defaultValues?.featured} className="h-4 w-4 accent-accent" />
        Feature this project on the homepage
      </label>

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