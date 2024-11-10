import type { Config } from "tailwindcss";

import tailwindcss_animate from "tailwindcss-animate";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			rowdies: ['Rowdies"', 'sans'],
  			poppins: ['Poppins', 'sans-serif']
  		},
  		fontSize: {
  			h1: '4.210rem',
  			h2: '3.15rem',
  			h3: '2.369rem',
  			h4: '1.777rem',
  			h5: '1.333rem',
  			small: '0.750rem'
  		},
  		fontWeight: {
  			light: '300',
  			regular: '400',
  			bold: '700'
  		},
  		colors: {
  			background: '#313132',
  			text: '#DACBBF',
  			primary: '#DA2323',
  			secondary: '#2C2C2D',
  			accent: '#727272',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [tailwindcss_animate],
};
export default config;
