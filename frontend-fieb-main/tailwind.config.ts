import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        blue: {
          '50': '#f0f7fe',
          '100': '#ddecfc',
          '200': '#c2dffb',
          '300': '#99cbf7',
          '400': '#68aff2',
          '500': '#458fec',
          '600': '#3375e1',
          '700': '#275ece',
          '800': '#264da7',
          '900': '#244384',
          '950': '#1a2b51',
        },
        green: {
          "100": "#D9FAD1",
          "200": "#ADF6A6",
          "300": "#   ",
          "400": "#4EC959",
          "500": "#1FA538",
          "600": "#168D38",
          "700": "#0F7636",
          "800": "#095F32",
          "900": "#054F2F",
        },
        red: {
          "100": "#FFD9D9",
          "200": "#FFA6A6",
          "300": "#FF7474",
          "400": "#FF5959",
          "500": "#FF3838",
          "600": "#D93838",
          "700": "#B53636",
          "800": "#932F2F",
          "900": "#7A2A2A",
        },
        yellow: {
          "100": "#FFFAE6",
          "200": "#FFF0B3",
          "300": "#FFE680",
          "400": "#FFD659",
          "500": "#FFC940",
          "600": "#D9A238",
          "700": "#B3862F",
          "800": "#936B26",
          "900": "#7A5721",
        },
        gray: {
          "100": "#F5F5F5",
          "200": "#E0E0E0",
          "300": "#BDBDBD",
          "400": "#9E9E9E",
          "500": "#757575",
          "600": "#616161",
          "700": "#424242",
          "800": "#303030",
          "900": "#212121",
        },
        white: '#f4f4f4',
        black: '#000000',
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
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config