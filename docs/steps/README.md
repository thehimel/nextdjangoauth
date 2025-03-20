# STEPS

## Setting Up a Next.js Project with Hero UI (Recommended Method)

* Initialize a Next.js project using the Hero UI template using: `npx heroui-cli@latest init -t app`
* Reference: [Hero UI Documentation](https://www.heroui.com/docs/frameworks/nextjs#heroui-cli-recommended)
* This command will create a new Next.js project with Hero UI pre-configured, streamlining your development process. 🚀
* Install all components with `npx heroui-cli@latest add --all`

## Add CI workflow for Next.js

* [ci.yml](../../.github/workflows/ci.yml)

## Install Dependencies for HeroUI PRO

* Install dependencies: `npm install --save-dev @iconify/react usehooks-ts recharts`
* Reference: [HeroUI Pro Documentation](https://www.heroui.pro/documentation)

## Configure Prettier Line Length to 120 Characters

* Update [.eslintrc.json](../../.eslintrc.json)

```json
{
  "rules": {
    "prettier/prettier": [
      "warn",
      {
        "printWidth": 120
      }
    ]
  }
}
```

## Create Favicon

* Generate the SVG code for the logo.
* Save it as a .svg file.
* Convert the .svg file to .ico.
* Save it as ![favicon.ico](../../public/favicon.ico)

# Make Site Name and Short Name Configurable

* Make a dynamic logo in [icons/index.tsx](../../modules/global/components/icons/index.tsx)
* Add environment variables in [.env.example](../../.env.example)
* Use the defined environment variables in [site.ts](../../modules/global/config/site.ts)

## Configure Default Theme

* Define `DEFAULT_THEME` in [constants.ts](../../modules/theme/constants.ts) and us it in [layout.tsx](../../app/layout.tsx)

# Use `Colors` enum for `themeColor` Values in Viewport

* Updated `themeColor` in [layout.tsx](../../app/layout.tsx)

## Centralized Management of Environment Variables

* Added a new file: [env.ts](../../modules/global/config/env.ts) for managing environment variables in a centralized way.
* Move all environment variable references (e.g., `.env`) into `env.ts` for better scalability and maintainability.
* Access environment variables throughout the project using the exported object from `env.ts`.

## Authentication

[SETUP_AUTHJS.md](SETUP_AUTHJS.md)

## Internationalization

[INTL.md](INTL.md)