<div align="center">
  <p style="font-size: 2.5rem; font-weight: 500;">VoxAI: An AI SaaS Platform</p>
  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="postgresql" />
    <img src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white" alt="supabase" />
  </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">🤖 Introduction</a>

Experience VoxAI: Your Ultimate AI Companion – Transform your digital world with advanced AI features. Enjoy smart chat support, efficient code generation, creative music composition, stunning video production, and professional image design. Boost your productivity and creativity with VoxAI.
<br /><br />
<img src="public/landing-image.png" alt="Project Banner">

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- TypeScript
- PostgreSQL
- Clerk
- Supabase
- Midtrans
- Shadcn
- TailwindCSS

## <a name="features">🔋 Features</a>

👉 **Advanced Tools and Functionalities**:
- Tailwind design with animations and effects for full responsiveness.
- Client form validation and handling using react-hook-form.
- Server error handling using react-toast.
- AI Tools for Image (Open AI), Video (Replicate AI), Conversation (Claude AI), Code Generation (Claude AI), and Music Generation (Replicate AI).
- Page loading state management.
- Midtrans payment integration.
- Free tier with API limiting.

👉 **Development Best Practices**:
- POST, DELETE, and GET route handling in app/api.
- Data fetching in server react components by directly accessing the database.
- Managing relations between Server and Child components.
- Reusing layouts effectively.
- Responsive UI/UX for a seamless experience across devices

and many more, including code architecture and reusability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/Firkhie/vox-ai.git
cd vox-ai
```

**Package Installation**

Install the project dependencies using npm:

```bash
npm i
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
#CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/dashboard

#AI
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
REPLICATE_API_TOKEN=

#SUPABASE & PRISMA
SUPABASE_DB_PASS=
DATABASE_URL=
DIRECT_URL=

#MIDTRANS
MIDTRANS_SERVER_KEY=
MIDTRANS_CLIENT_KEY=
```

Replace the placeholder values with your actual respective account credentials.

**Setup Prisma**

Add PostgreSQL Database (I used Supabase)

```bash
npx prisma db push
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

#
