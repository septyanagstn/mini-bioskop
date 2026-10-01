/** @type {import('tailwindcss').Config} */
            export default {
              content: [
                './index.html',
                './src/**/*.{vue,js,ts,jsx,tsx}',
              ],
              theme:  {
                extend: {
                  colors: {
        "primary": "#3B82F6",
        "secondary": "#10B981",
        "accent": "#8B5CF6",
        "background": "#FFFFFF",
        "surface": "#F3F4F6",
        "text": "#1F2937",
        "muted": "#9CA3AF"
},
                  fontFamily: {
        "inter": [
                "Inter",
                "sans-serif"
        ]
},
                },
              },
              plugins: [],
            };
