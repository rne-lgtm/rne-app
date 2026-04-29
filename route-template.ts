export const routeTemplate = `import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/test")({
  component: () => {
  return <div>Hello "/"!</div>;
  },
});`;
