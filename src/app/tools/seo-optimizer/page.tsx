import { SeoOptimizerForm } from './_components/SeoOptimizerForm';
import { SearchCheck } from 'lucide-react';

export default function SeoOptimizerPage() {
  return (
    <div className="container max-w-3xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <SearchCheck className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline">SEO Optimizer</h1>
          <p className="text-muted-foreground">
            Improve your on page SEO with AI powered analysis and suggestions.
          </p>
        </div>
      </div>
      <SeoOptimizerForm />
    </div>
  );
}
