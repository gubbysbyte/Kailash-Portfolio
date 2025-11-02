# Kailash Portfolio

Welcome to this interactive 3D portfolio website of mine!

## 🌟 Features

- **Interactive 3D Homepage**: A beautiful 3D island model that users can rotate, with an animated plane and bird.
- **Smooth Animations**: Seamless transitions and animations powered by React Three Fiber and Framer Motion.
- **Four Main Sections**:
  - **Home**: An interactive 3D scene.
  - **About**: A summary of your skills and work experience with a vertical timeline.
  - **Projects**: A dedicated section to showcase your work.
  - **Contact**: An animated contact form with a 3D fox model that sends emails directly to your inbox.
- **Functional Contact Form**: Integrated with EmailJS to receive messages without a backend.
- **Responsive Design**: Looks great on all devices, from desktops to mobile phones.

## 🛠️ Tech Stack

- **Frontend**: [React.js](https://reactjs.org/)
- **3D Rendering**: [Three.js](https://threejs.org/), [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [React Three Drei](https://github.com/pmndrs/drei)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Email Service**: [EmailJS](https://www.emailjs.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) and `npm` installed on your system.

### Installation & Setup

1.  **Clone the repository** (or download the source code):
    ```bash
    git clone https://github.com/gubbysbyte/Kailash-Portfolio.git
    cd Kailash-Portfolio
    ```

2.  **Install NPM packages**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables for the Contact Form**:
    This project uses EmailJS to handle contact form submissions.

    - Create a free account at EmailJS.
    - Add a new email service (e.g., Gmail) and get your **Service ID**.
    - Create a new email template and get your **Template ID**. Make sure your template uses the following variables: `{{from_name}}`, `{{to_name}}`, `{{from_email}}`, `{{message}}`.
    - Find your **Public Key** in your EmailJS account settings.
    - Create a `.env` file in the root of the project and add your credentials:
      ```
      VITE_APP_EMAILJS_SERVICE_ID=YOUR_SERVICE_ID
      VITE_APP_EMAILJS_TEMPLATE_ID=YOUR_TEMPLATE_ID
      VITE_APP_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
      ```

4.  **Run the development server**:
    ```bash
    npm run dev
    ```
    Open http://localhost:5173 (or the URL provided in your terminal) to view it in the browser.

## 🎨 Customization

Almost all the personal information, skills, and project data is centralized in `src/constants/index.js`.

1.  **Personal Information**:
    - **Homepage Intro**: Edit `src/components/HomeInfo.jsx` to change the welcome message.
    - **About Page**: Modify the text and your name in `src/pages/About.jsx`.
    - **Footer**: Change the name in `src/components/Footer.jsx`.

2.  **Skills, Experience, Projects, and Social Links**:
    - Open `src/constants/index.js`.
    - **`skills`**: Add or remove your skills. The icons are imported from `src/assets/icons`.
    - **`experiences`**: Update the `experiences` array with your work history.
    - **`projects`**: Update the `projects` array with your own projects. Add project icons to `src/assets/icons`.
    - **`socialLinks`**: Update the links to your GitHub, LinkedIn, and other social profiles.

3.  **Contact Form Recipient**:
    - Open `src/pages/Contact.jsx`.
    - Change the `to_name` value inside the `handleSubmit` function to your name.

## 📦 Deployment

1.  **Build the project for production**:
    ```bash
    npm run build
    ```
    This command creates a `dist` folder with the optimized, static files.

2.  **Deploy**:
    You can easily deploy the contents of the `dist` folder to any static site hosting service like:
    - Vercel
    - Netlify
    - GitHub Pages

## 🙏 Acknowledgements

- Original concept and tutorial by Adrian Hajdin.
- 3D Models:
  - Fox: Sketchfab
  - Island: Sketchfab
  - Bird: Sketchfab

---
