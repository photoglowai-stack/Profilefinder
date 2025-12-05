import React from "react";
import { Hero } from "../components/Hero";
import { ProofBar } from "../components/ProofBar";
import { Steps } from "../components/Steps";
import { Security } from "../components/Security";
import { Benefits } from "../components/Benefits";
import { Testimonials } from "../components/Testimonials";
import { Pricing } from "../components/Pricing";
import { FAQ } from "../components/FAQ";
import { LeadForm } from "../components/LeadForm";

export function Home() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>

      <section>
        <ProofBar />
      </section>

      <section id="steps">
        <Steps />
      </section>

      <section id="security">
        <Security />
      </section>

      <section>
        <Benefits />
      </section>

      <section>
        <Testimonials />
      </section>

      <section id="pricing">
        <Pricing />
      </section>

      <section id="faq">
        <FAQ />
      </section>

      {/* section “contact / formulaire” */}
      <section id="contact">
        <LeadForm />
      </section>
    </>
  );
}
