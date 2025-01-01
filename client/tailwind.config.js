/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         fontWeight: {
            '400': '400',
            '500': '500',
            '600': '600',
         },
      },
   },
   plugins: [],
}