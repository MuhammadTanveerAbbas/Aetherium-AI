import { BlogWriterForm } from './_components/BlogWriterForm';
import { PenSquare } from 'lucide-react';

export default function BlogWriterPage() {
  return (
    <div className="container max-w-3xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <PenSquare className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline">AI Blog Writer</h1>
          <p className="text-muted-foreground">
            Generate a full length article from a short brief.
          </p>
        </div>
      </div>
      <BlogWriterForm />
    </div>
  );
}
