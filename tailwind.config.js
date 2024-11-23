/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "custom-color-1": "#E2E8F0",
        "custom-color-2": "#94A3B8",
        "custom-text-color-1": "#334155",
      },
    },
  },
  plugins: [],
};
