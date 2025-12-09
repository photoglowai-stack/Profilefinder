Frontend stack for this workspace

- Framework: Vite with React and TypeScript.
- Routing: React Router (react-router-dom).
- UI: shadcn/ui + Tailwind CSS.
- Forms: react-hook-form + zod for schema validation.
- Data fetching & sync: tRPC + @tanstack/react-query.
- State management: zustand (no Redux).
- Animations: framer-motion (use the `motion` component).
- Dates: date-fns.
- URL/search params: nuqs.
- Charts: recharts.
- Tables: @tanstack/react-table for complex data tables.
- AI features: use the `ai` SDK when implementing AI-related features.

Assume all these libraries are already installed in package.json.
Do NOT re-run npm install for them. Just import and use them.
