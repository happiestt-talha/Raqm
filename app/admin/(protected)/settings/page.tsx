import { db } from "@/lib/db";
import { SettingsForm } from "@/components/admin/forms/settings-form";

export default async function SettingsPage() {
  const settings = await db.settings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" }
  });

  return (
    <div>
      <h1 className="text-h2 font-display uppercase">Settings</h1>
      <p className="mt-2 text-sm text-ink/60">
        Controls the hero, about, and contact sections on your public site.
      </p>
      <div className="mt-8">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}