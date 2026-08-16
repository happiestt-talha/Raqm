"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateSettings, type SettingsFormState } from "@/lib/actions/settings";

type Settings = {
  heroHeadline: string;
  heroSubtext: string;
  bio: string;
  email: string;
  phone: string | null;
  location: string;
  availability: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
};

const initialState: SettingsFormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="label-mono self-start border border-ink bg-ink px-6 py-3 text-paper transition-colors hover:bg-accent hover:border-accent disabled:opacity-50"
    >
      {pending ? "Saving…" : "Save changes"}
    </button>
  );
}

export function SettingsForm({ settings }: { settings: Settings }) {
  const [state, formAction] = useFormState(updateSettings, initialState);

  return (
    <form action={formAction} className="flex max-w-2xl flex-col gap-10">
      {/* Hero section */}
      <fieldset className="flex flex-col gap-6">
        <legend className="label-mono mb-2 text-accent">Hero</legend>
        <Field name="heroHeadline" label="Headline" defaultValue={settings.heroHeadline} error={state.errors?.heroHeadline} />
        <TextareaField name="heroSubtext" label="Subtext" defaultValue={settings.heroSubtext} rows={3} />
      </fieldset>

      {/* About section */}
      <fieldset className="flex flex-col gap-6">
        <legend className="label-mono mb-2 text-accent">About</legend>
        <TextareaField
          name="bio"
          label="Bio (separate paragraphs with a blank line)"
          defaultValue={settings.bio}
          rows={6}
        />
      </fieldset>

      {/* Contact section */}
      <fieldset className="flex flex-col gap-6">
        <legend className="label-mono mb-2 text-accent">Contact</legend>
        <div className="grid grid-cols-2 gap-6">
          <Field name="email" label="Email" type="email" defaultValue={settings.email} error={state.errors?.email} />
          <Field name="phone" label="Phone (optional)" defaultValue={settings.phone ?? ""} />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Field name="location" label="Location" defaultValue={settings.location} error={state.errors?.location} />
          <Field name="availability" label="Availability status" defaultValue={settings.availability} error={state.errors?.availability} />
        </div>
      </fieldset>

      {/* Socials section */}
      <fieldset className="flex flex-col gap-6">
        <legend className="label-mono mb-2 text-accent">Socials</legend>
        <div className="grid grid-cols-2 gap-6">
          <Field name="githubUrl" label="GitHub URL" defaultValue={settings.githubUrl ?? ""} error={state.errors?.githubUrl} />
          <Field name="linkedinUrl" label="LinkedIn URL" defaultValue={settings.linkedinUrl ?? ""} error={state.errors?.linkedinUrl} />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Field name="twitterUrl" label="Twitter/X URL" defaultValue={settings.twitterUrl ?? ""} error={state.errors?.twitterUrl} />
          <Field name="instagramUrl" label="Instagram URL" defaultValue={settings.instagramUrl ?? ""} error={state.errors?.instagramUrl} />
        </div>
      </fieldset>

      <div className="flex items-center gap-4">
        <SubmitButton />
        {state.success && (
          <p className="text-sm text-ink/70" role="status">Saved — live site updated.</p>
        )}
      </div>
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

function TextareaField({
  name,
  label,
  defaultValue,
  rows = 4
}: {
  name: string;
  label: string;
  defaultValue?: string;
  rows?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="label-mono text-muted">{label}</label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        defaultValue={defaultValue}
        className="mt-2 w-full border border-border bg-paper p-3 text-sm focus:border-accent focus:outline-none"
      />
    </div>
  );
}