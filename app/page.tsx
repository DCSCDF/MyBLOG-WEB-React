import Hero from "@/components/hero";
import {readdirSync} from "fs";
import {join} from "path";
import {getConfigsByKeysServer} from "@/lib/api/config.server";
import {HeroConfig} from "@/lib/hooks/useConfig";

const DEFAULT_HERO_CONFIG: HeroConfig = {
    title: "Hero Title",
    content: "A simple website.",
    githubLink: "https://github.com",
};

export const dynamic = "force-dynamic";

export default async function Home() {
    const heroImages = readdirSync(join(process.cwd(), "public", "hero-img"))
        .filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f))
        .map((f) => `/hero-img/${f}`);

    const configMap = await getConfigsByKeysServer([
        "hero.title",
        "hero.content",
        "hero.githubLink",
    ]);

    const heroConfig: HeroConfig = {
        title: configMap.get("hero.title") || DEFAULT_HERO_CONFIG.title,
        content: configMap.get("hero.content") || DEFAULT_HERO_CONFIG.content,
        githubLink: configMap.get("hero.githubLink") || DEFAULT_HERO_CONFIG.githubLink,
    };

    return (
        <section>
            <Hero images={heroImages} config={heroConfig}/>
        </section>
    );
}
