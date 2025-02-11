import { Hero } from "@/components/Hero"
import { ThemeToggle } from "@/components/theme-toggle"
import { About } from "@/components/About"

export default function Home() {
  return (
    <>
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
    </>
  )
}
