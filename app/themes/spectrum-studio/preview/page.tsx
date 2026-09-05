import type { Metadata } from "next";
import SpectrumExperience from "./SpectrumExperience";
import "./spectrum-studio.css";

export const metadata: Metadata = {
  title: "Spectrum Studio — Independent Creative Studio",
  description: "A high-energy creative studio theme for brand, product, web, and motion work, built with Coordiation.",
};

export default function SpectrumStudioPreview() {
  return <SpectrumExperience />;
}
