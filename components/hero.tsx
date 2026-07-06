import {CanvasFractalGrid} from "@/components/ui/canvas-fractal-grid";

export default function Hero() {

    return (
        <section className="relative w-full min-h-150">
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <CanvasFractalGrid
                    dotSize={2.5}
                    dotSpacing={20}
                    dotOpacity={0.4}
                    gradientAnimationDuration={6}
                    waveIntensity={60}
                    waveRadius={250}
                    enableGradient={false}
                    enableMouseGlow={false}
                    enableNoise={true}
                    bottomFadeHeight={0.5}

                />
            </div>
            <div className="relative z-10 pt-20">
                {/* 在这里写你的内容 */}

                123
            </div>
        </section>
    );
}
