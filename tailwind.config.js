/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
            padding: '1rem',
        },
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: {
                    DEFAULT: 'var(--primary)',
                    foreground: 'var(--primary-foreground)',
                },
                secondary: {
                    DEFAULT: 'var(--secondary)',
                    foreground: 'var(--secondary-foreground)',
                },
                accent: {
                    DEFAULT: 'var(--accent)',
                    foreground: 'var(--accent-foreground)',
                },
                muted: {
                    DEFAULT: 'var(--muted)',
                    foreground: 'var(--muted-foreground)',
                },
                card: {
                    DEFAULT: 'var(--card)',
                    foreground: 'var(--card-foreground)',
                },
                border: 'var(--border)',
                input: 'var(--input)',
                ring: 'var(--ring)',
            },
            borderRadius: {
                sm: 'calc(var(--radius) - 4px)',
                md: 'var(--radius)',
                lg: 'calc(var(--radius) + 4px)',
                xl: 'calc(var(--radius) + 8px)',
                '2xl': 'calc(var(--radius) + 16px)',
                '3xl': 'calc(var(--radius) + 24px)',
                '4xl': '2rem',
                '5xl': '2.5rem',
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'sans-serif'],
                display: ['var(--font-display)', 'serif'],
            },
            animation: {
                'cinematic': 'cinematicEntrance 3.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                'slide-up': 'slideUpFade 1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                'float': 'floatY 6s ease-in-out infinite',
                'blob': 'blobMorph 10s ease-in-out infinite',
                'gradient': 'gradientShift 8s ease infinite',
                'scroll-bounce': 'scrollBounce 2s ease-in-out infinite',
                'shimmer': 'shimmerMove 3.5s ease-in-out infinite',
            },
            backgroundSize: {
                '200': '200% 200%',
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};