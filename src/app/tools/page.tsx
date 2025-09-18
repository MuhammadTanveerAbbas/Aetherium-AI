import { tools } from "@/app/lib/tools";
import { ToolCard } from "@/components/ToolCard";

export default function ToolsPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-wider sm:text-5xl font-headline">
          The Aetherium Toolbox
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mt-4">
          Select a tool to start creating. More tools coming soon!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.name} {...tool} />
        ))}
      </div>
    </div>
  );
}
