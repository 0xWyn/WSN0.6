export const NoiseTexture = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-10">
            <svg className="w-full h-full" xmlns="http://w3.org">
                <filter id="noiseFilter">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.9"
                        numOctaves="2"
                        stitchTiles="stitch"
                    />

                    <feColorMatrix type="saturate" values="0" />

                    <feComponentTransfer>
                        <feFuncA type="table" tableValues="0 0.12" />
                    </feComponentTransfer>
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
            </svg>
        </div>
    );
};
