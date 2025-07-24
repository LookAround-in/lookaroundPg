# Welcome to LookaroundPG

**Setup the project locally in your machine.**

The only requirement is having Node.js & npm installed.

**Use `pnpm` instead of `npm`.**

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/LookAround-in/lookaroundPg.git

# Step 2: Navigate to the project directory.
cd lookaorundPg/web

# Step 3: Install the necessary dependencies.
pnpm i

# Step 4: Start your Docker engine to setup local DB.
docker compose up

# Step 5: Setup the db with prisma migrations.
pnpm dlx prisma migrate reset
pnpm dlx prisma generate

# Step 6: Seed the DB with initial data using the seed script.
pnpm run seed

# Step 7: Start the development server with auto-reloading and an instant preview.
pnpm run dev
```

## What technologies are used for this project?

This project is built with:

- NextJS
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Prisma
- PostgreSQL
- TanStackQuery
- Zod
- Cloudinary
- React-Hook-Form
