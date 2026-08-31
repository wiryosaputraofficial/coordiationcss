import type { Metadata } from "next";
import { ProjectCard, StudioHeader } from "./DashboardComponents";
import { studioProjects } from "./projects";
import "./studio-index.css";

export const metadata: Metadata = { title: "Studio Index — Brand & Product Designer", description: "A minimal portfolio theme for independent brand and product designers, built with Coordiation." };

export default function StudioIndexPreview() {
  return <main className="studio-index" id="top"><StudioHeader /><section className="si-intro"><p className="si-eyebrow">Independent practice · 2016—now</p><h1>Designer based in Jakarta.<br />Building brands and useful products.</h1><p>I work with people making things worth caring about—through positioning, visual identity, digital products, and systems that stay useful after launch.</p></section><section className="si-grid co-grid" id="work">{studioProjects.map((project) => <ProjectCard project={project} key={project.slug} />)}</section><footer className="si-footer co-flex co-items-center co-justify-between" id="contact"><p>Have a useful challenge?<br /><a href="mailto:hello@coordiation.com">hello@coordiation.com</a></p><div className="co-flex co-items-center"><a href="#top">Back to top</a><a href="#work">Selected work</a></div></footer></main>;
}
