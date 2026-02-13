# 🚒 Lemme Fire Technics

A modern, bilingual (FR/NL) Single Page Application (SPA) built for **David Leemans**, a professional firefighter and instructor. This platform showcases fire safety training courses for both professional firefighters and civilians, featuring dynamic content management and SEO optimization.

![Project Banner](public/og-default.jpg)

## 🚀 Tech Stack

**Core:**
* ![React](https://img.shields.io/badge/React-18-blue?logo=react) **React 18** (via Vite)
* ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) **TypeScript**
* ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css) **Tailwind CSS**

**Backend & Services:**
* ![Supabase](https://img.shields.io/badge/Supabase-Database-green?logo=supabase) **Supabase** (PostgreSQL) - *Dynamic content (Formations, Levels, Gallery)*
* ![EmailJS](https://img.shields.io/badge/EmailJS-Contact_Form-orange) **EmailJS** - *Serverless contact form emails*

**Libraries & Tools:**
* 🗣️ **i18next** - *Internationalization (French/Dutch)*
* 🔍 **React Helmet Async** - *SEO & Metadata management*
* 🛣️ **React Router** - *Client-side routing*
* 🎨 **Lucide React** - *Iconography*

---

## ✨ Key Features

* **Bilingual Support:** Full FR/NL translation with auto-detection and persistent language preferences.
* **Dynamic Content:** All training courses, detailed levels, and gallery images are fetched in real-time from Supabase.
* **SEO Optimized:** Unique metadata (`<title>`, `<meta description>`, OpenGraph tags) for every page and formation. Includes JSON-LD Structured Data for rich snippets.
* **Interactive Gallery:** A filterable photo gallery combining static assets and dynamic uploads from the database.
* **Certification Portal:** A modal system allowing users to view and download PDF certifications (Brevets).
* **Responsive Design:** Mobile-first architecture ensuring a seamless experience on all devices.

---

## 🛠️ Environment Variables

To run this project locally, you will need to add the following environment variables to your `.env` file:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

```

---

## 🗄️ Database Schema (Supabase)

The application relies on the following tables in Supabase:

1. **`formations`**: Main categories (e.g., "Secours Routier"). Contains title, description, and category (Civilian/Pro).
2. **`formation_levels`**: Specific modules linked to a formation (e.g., "Level 1", "Level 2").
3. **`brevets`**: List of certifications and PDF URLs.
4. **`level_images`**: A dedicated table for gallery images linked to specific training levels (used for the dynamic Gallery page).

*Note: Ensure your Supabase RLS (Row Level Security) policies allow public `SELECT` access to these tables.*

---

## 📦 Installation & Setup

1. **Clone the repository**
```bash
git clone [https://github.com/your-username/lemme-fire-technics.git](https://github.com/Thomas-Heusdens/lemmefiretechnics)
cd lemme-fire-technics

```


2. **Install dependencies**
```bash
npm install

```


3. **Run development server**
```bash
npm run dev

```


4. **Build for production**
```bash
npm run build

```

---

## 🚢 Deployment

This project is optimized for deployment on **Vercel**.

1. Connect your GitHub repository to Vercel.
2. Select **Vite** as the framework preset.
3. Add the **Environment Variables** (from the section above) in the Vercel dashboard.
4. Deploy! 🚀

---

## 👤 Author

**Thomas Heusdens**

* [LinkedIn](https://www.linkedin.com/in/thomas-heusdens-0bba19258/)
* [GitHub](https://www.google.com/search?q=https://github.com/ThomasHeusdens)

Created for **Lemme Fire Technics** © 2024.
