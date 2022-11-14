/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}"
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0FCFEC",
          secondary: "#19D3AE",
          accent: "#3A4256",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
        }
      },
      {
        extend: {
          backgroundImage: {
            'bgImg': "url('/src/assets/images/chair.png')",
          }
        }
      }
    ]
  },
  plugins: [require("daisyui")],
}