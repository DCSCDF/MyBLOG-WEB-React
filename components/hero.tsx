
import { readdirSync } from "fs";
import { join } from "path";
import TextAnimate from "@/components/ui/text-animate";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";

export default function Hero() {
    const heroImages = readdirSync(join(process.cwd(), "public", "hero-img"))
        .filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f))
        .map((f) => `/hero-img/${f}`);
    return (
        <section className="relative h-screen w-full overflow-hidden">
            <div className="absolute inset-0">
                <ThreeDMarquee images={heroImages} />
            </div>

            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-8">
                <AppleHelloEnglishEffect className="text-gray-800 h-16" />
                <TextAnimate text="I am a Blog Developer" type="rollIn" />
            </div>
        </section>
    );
}
