/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      body: [
        "Hiragino Kaku Gothic ProN",
        "ヒラギノ角ゴ ProN W3",
        "YuGothic",
        "Yu Gothic",
        "sans-serif",
      ],
    },
    extend: {
      fontSize: {
        customMainvisualText: "clamp(1.875rem, 0.732rem + 4.878vw, 5rem)",
        customMainvisualCircleName: "clamp(1.125rem, 0.439rem + 2.927vw, 3rem)",
      },
      width: {
        customMainvisual: "clamp(23.438rem, 11.433rem + 51.22vw, 56.25rem)",
        customMainvisualReservation:
          "clamp(1.125rem, 0.439rem + 2.927vw, 3rem)",
        customWorryImage: "clamp(15.625rem, 12.324rem + 14.085vw, 25rem)",
        customAccordion: "clamp(20rem, -1.226rem + 90.566vw, 35rem)",
        customFlow: "clamp(23.438rem, 19.097rem + 18.519vw, 28.125rem)",
        customFlowImg: "clamp(10rem, 4.792rem + 22.222vw, 15.625rem);",
      },
      height: {
        customMainvisual: "clamp(23.438rem, 11.433rem + 51.22vw, 56.25rem)",
        customMainvisualReservation:
          "clamp(1.125rem, 0.439rem + 2.927vw, 3rem)",
        customWorryImage: "clamp(15.625rem, 12.324rem + 14.085vw, 25rem)",
        customFlowImg: "clamp(10rem, 4.792rem + 22.222vw, 15.625rem);",
      },
      colors: {
        customYellow: "#e7d475",
        facebookColor: "#4267B2",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
