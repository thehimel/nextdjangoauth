# NextDjangoAuth

A secure authentication solution built with Next.js and Django REST framework, providing seamless user login,
registration, and access control with modern security features.

## Technologies Used

- [Node.js v22.13.1 LTS](https://nodejs.org/)
- [Next.js 15.0.4](https://nextjs.org/docs/getting-started)
- [HeroUI v2](https://heroui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## Getting Started

### Clone the Repository

Clone the repository to your local machine:

```shell
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### Configure the Environment

Follow [Environment Management](#environment-management)  

### Install Dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install
```

### Run the Server

* dev: `npm run dev`
* build: `npm run build`
* start: `npm run start`

## Environment Management

### Setting Up Environment Files

Create the required environment files from the provided examples:

```shell
cp .env.example .env.local  # For local
cp .env.production.example .env.production.local  # For production
```

> Update the respective environment variables in each file as needed.

### Managing Environments in Next.js

The application may only recognize `.env`, so depending on your environment, copy the appropriate file:

```shell
cp .env.local .env  # For local
cp .env.production.local .env  # For production
```

### Automating Execution

To streamline the execution process, use the following scripts:
* Local: [run_local.sh](run_local.sh)
* Production: [run_production.sh](run_production.sh)

> These scripts will automatically copy the respective environment data to `.env` and start the server.

### Notes

* If the production backend server does not allow `localhost` as an approved host, you won't be able to make API calls
  to the production backend from your local machine. Make sure the backend's CORS settings include `localhost` or update
  the allowed hosts to enable local development connections.
