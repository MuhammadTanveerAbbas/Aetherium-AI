import { AIPersonaCreatorForm } from './_components/AIPersonaCreatorForm';
import { Bot } from 'lucide-react';

export default function AIPersonaCreatorPage() {
  return (
    <div className="container max-w-3xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <Bot className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline">AI Persona Creator</h1>
          <p className="text-muted-foreground">
            Develop detailed AI personas for marketing and product development.
          </p>
        </div>
      </div>
      <AIPersonaCreatorForm />
    </div>
  );
}
