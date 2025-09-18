import { VideoScriptGeneratorForm } from './_components/VideoScriptGeneratorForm';
import { Film } from 'lucide-react';

export default function VideoScriptGeneratorPage() {
  return (
    <div className="container max-w-3xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <Film className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline">Video Script Generator</h1>
          <p className="text-muted-foreground">
            Create engaging scripts for your YouTube, TikTok, or Reels videos.
          </p>
        </div>
      </div>
      <VideoScriptGeneratorForm />
    </div>
  );
}
