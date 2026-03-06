import Header from "@/components/Header";
import SideRail from "@/components/SideRail";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Stack3D from "@/components/sections/Stack3D";
import Works from "@/components/sections/Works";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      <Header />
      <SideRail />

      {/* ЕДИНСТВЕННЫЙ скролл-контейнер (для snap) */}
      <main
        id="scroll-root"
        className="h-screen overflow-y-auto overflow-x-hidden bg-[#0b0c10] text-white"
      >
        <div className="snap-section">
          <Hero />
        </div>

        <div className="snap-section">
          <About />
        </div>

        <div className="snap-section">
          <Skills />
        </div>

        <div className="snap-section">
          <Stack3D />
        </div>

        <div className="snap-section">
          <Works />
        </div>

        <div className="snap-section">
          <Contact />
        </div>
      </main>
    </>
  );
}
