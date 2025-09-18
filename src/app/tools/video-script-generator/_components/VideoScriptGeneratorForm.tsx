"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateVideoScript, type GenerateVideoScriptOutput } from "@/ai/flows/generate-video-script";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Clipboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  topic: z.string().min(10, "Topic must be at least 10 characters long."),
  platform: z.string().min(1, "Please select a platform."),
  duration: z.string().min(3, "Please specify a duration."),
});

type FormValues = z.infer<typeof formSchema>;

function scriptToPlainText(scriptOutput: GenerateVideoScriptOutput): string {
  let text = `Title: ${scriptOutput.title}\n\n`;
  text += `Hook: ${scriptOutput.hook}\n\n`;
  text += `--- SCRIPT ---\n\n`;
  scriptOutput.script.forEach(scene => {
    text += `Scene ${scene.scene}\n`;
    text += `Visuals: ${scene.visuals}\n`;
    text += `Dialogue: ${scene.dialogue}\n\n`;
  });
  text += `--- CTA ---\n`;
  text += `${scriptOutput.cta}\n`;
  return text;
}


export function VideoScriptGeneratorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateVideoScriptOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      platform: "YouTube",
      duration: "1 minute",
    },
  });
  
  const handleCopy = () => {
    if (result) {
      const textToCopy = scriptToPlainText(result);
      navigator.clipboard.writeText(textToCopy);
      toast({
        title: "Copied!",
        description: "The video script has been copied to your clipboard.",
      });
    }
  };


  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    try {
      const scriptResult = await generateVideoScript(values);
      setResult(scriptResult);
    } catch (error) {
      console.error("Error generating script:", error);
      toast({
        title: "Error",
        description: "Failed to generate video script. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Video Details</CardTitle>
          <CardDescription>Describe your video to generate a complete script.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video Topic</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., A tutorial on how to make the perfect sourdough bread at home." rows={4} {...field} className="resize-none"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="YouTube">YouTube</SelectItem>
                          <SelectItem value="TikTok">TikTok</SelectItem>
                          <SelectItem value="Instagram Reels">Instagram Reels</SelectItem>
                          <SelectItem value="Short Film">Short Film</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desired Duration</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 30 seconds, 5 minutes" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Script
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(isLoading || result) && (
        <Card className="mt-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Generated Video Script</CardTitle>
              {result && (
                 <Button variant="ghost" size="icon" onClick={handleCopy}>
                  <Clipboard className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ) : (
              result && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold font-headline">{result.title}</h3>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary">Hook</h4>
                    <p className="text-foreground/90 italic">"{result.hook}"</p>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h4 className="font-semibold text-primary">Script</h4>
                    {result.script.map((scene) => (
                      <div key={scene.scene} className="space-y-2 p-4 border rounded-md bg-secondary/50">
                        <p className="font-bold">Scene {scene.scene}</p>
                        <p><span className="font-semibold">Visuals:</span> {scene.visuals}</p>
                        <p><span className="font-semibold">Dialogue:</span> {scene.dialogue}</p>
                      </div>
                    ))}
                  </div>
                   <Separator />
                  <div className="space-y-2">
                    <h4 className="font-semibold text-primary">Call to Action (CTA)</h4>
                    <p className="text-foreground/90">{result.cta}</p>
                  </div>
                </div>
              )
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
