# NexTrend

NexTrend is an AI-powered content trend prediction platform designed for social media creators and marketers. The application helps users discover trending niches, analyze content performance, and generate viral content ideas across YouTube and TikTok platforms. Built with modern web technologies, it features a comprehensive dashboard for trend insights, keyword research tools, and AI-driven content recommendations.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Lints the project files.

## Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables:

```
# Example environment variables
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

See `.env.example` for a full list of environment variables.

## Linting and Formatting

This project uses ESLint and Prettier for code linting and formatting. To run the linter, use:

```bash
npm run lint
```

## Testing

This project will use Jest and React Testing Library for unit tests. Test files will be located next to the component they are testing.

## CI/CD

A GitHub Actions workflow will be set up in `.github/workflows/ci.yml` to run on every pull request. The workflow will install dependencies, run the linter, run tests, and build the project.
