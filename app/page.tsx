import Hero from "@/components/hero";
import { readdirSync } from "fs";
import { join } from "path";

export const dynamic = "force-dynamic";

export default function Home() {
  const heroImages = readdirSync(join(process.cwd(), "public", "hero-img"))
    .filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f))
    .map((f) => `/hero-img/${f}`);

  return (
    <section>
        <Hero images={heroImages}/>
    </section>
  );
}
