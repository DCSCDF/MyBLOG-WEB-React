
import TextAnimate from "@/components/ui/text-animate";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

const marqueeColors = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
                
  "#8b5cf6",
  "#ec4899",
  "#06b6d4",
  "#84cc16",
  "#a855f7",
  "#f43f5e",
  "#10b981",
  "#6366f1",
  "#d946ef",
  "#0ea5e9",
];

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            <div className="absolute inset-0">
                <ThreeDMarquee colors={marqueeColors} />
            </div>

            <div className="relative z-10 flex h-full items-center justify-center pt-26">
                <TextAnimate text="Build beautiful" type="rollIn" />
            </div>
        </section>
    );
}
