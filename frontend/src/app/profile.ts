/** Form von GET /api/profile (backend/src/main/resources/profile.json). */
export interface Profile {
  name: string;
  title: string;
  tagline: string;
  about: string[];
  contact: { email: string; github: string; linkedin: string };
  skills: SkillGroup[];
  experience: Entry[];
  education: Entry[];
  projects: Project[];
}

export interface Entry { period: string; role: string; company: string; description: string; }
export interface SkillGroup { label: string; items: string[]; }
export interface Project { name: string; tagline: string; description: string; highlights: string[]; tech: string[]; url: string; }
