import { Nav } from "@/components/public/nav";
import { Hero } from "@/components/public/hero";
import { SelectedWork } from "@/components/public/selected-work";
import { ExperienceTimeline } from "@/components/public/experience-timeline";
import { SkillsGrid } from "@/components/public/skills-grid";
import { About } from "@/components/public/about";
import { ContactSection } from "@/components/public/contact-section";
import { Footer } from "@/components/public/footer";
import { getExperience, getProjects, getSkillsByCategory, getSettings } from "@/lib/data";

export const revalidate = 3600; // ISR: rebuild at most once an hour, plus on-demand via revalidatePath from Raqm

export default async function HomePage() {
  const [experience, projects, skills, settings] = await Promise.all([
    getExperience(),
    getProjects(),
    getSkillsByCategory(),
    getSettings()
  ]);

  return (
    <>
      <Nav />
      <main>
        <Hero
          headline={settings.heroHeadline}
          subtext={settings.heroSubtext}
          availability={settings.availability}
        />
        <SelectedWork projects={projects} />
        <ExperienceTimeline items={experience} />
        <SkillsGrid skills={skills} />
        <About bio={settings.bio} location={settings.location} email={settings.email} availability={settings.availability} />
        <ContactSection
          email={settings.email}
          phone={settings.phone}
          location={settings.location}
          githubUrl={settings.githubUrl}
          linkedinUrl={settings.linkedinUrl}
          twitterUrl={settings.twitterUrl}
          instagramUrl={settings.instagramUrl}
        />
      </main>
      <Footer />
    </>
  );
}