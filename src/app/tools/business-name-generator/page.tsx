import { BusinessNameGeneratorForm } from './_components/BusinessNameGeneratorForm';
import { Briefcase } from 'lucide-react';

export default function BusinessNameGeneratorPage() {
  return (
    <div className="container max-w-3xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <Briefcase className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline">Name Generator</h1>
          <p className="text-muted-foreground">
            Generate creative and catchy names for your business or project.
          </p>
        </div>
      </div>
      <BusinessNameGeneratorForm />
    </div>
  );
}
