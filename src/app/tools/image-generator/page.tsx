import { ImageGeneratorForm } from './_components/ImageGeneratorForm';
import { ImageIcon } from 'lucide-react';

export default function ImageGeneratorPage() {
  return (
    <div className="container max-w-3xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <ImageIcon className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline">Image Generator</h1>
          <p className="text-muted-foreground">
            Create unique images from text descriptions with Imagen 4.
          </p>
        </div>
      </div>
      <ImageGeneratorForm />
    </div>
  );
}
