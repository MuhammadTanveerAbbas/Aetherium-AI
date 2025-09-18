"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { optimizeContentForSEO, type OptimizeContentForSEOOutput } from "@/ai/flows/optimize-content-for-seo";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Clipboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  content: z.string().min(50, "Content must be at least 50 characters long."),
  targetKeyword: z.string().min(2, "Target keyword must be at least 2 characters long."),
});

type FormValues = z.infer<typeof formSchema>;

export function SeoOptimizerForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<OptimizeContentForSEOOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      targetKeyword: "",
    },
  });
  
  const handleCopy = (contentToCopy: string, type: string) => {
    navigator.clipboard.writeText(contentToCopy);
    toast({
      title: "Copied!",
      description: `The ${type} have been copied to your clipboard.`,
    });
  };


  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    try {
      const seoResult = await optimizeContentForSEO(values);
      setResult(seoResult);
    } catch (error) {
      console.error("Error optimizing content:", error);
      toast({
        title: "Error",
        description: "Failed to optimize content. Please try again.",
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
          <CardTitle>Content Analysis</CardTitle>
          <CardDescription>Paste your content and target keyword to get an instant SEO audit.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content to Optimize</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Paste your article content here..." rows={10} {...field} className="resize-none"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetKeyword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Keyword</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., sustainable energy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Optimize Content
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(isLoading || result) && (
        <div className="mt-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>SEO Score</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-full" />
              ) : (
                result && (
                  <div>
                    <span className="text-2xl font-bold">{result.seoScore}</span>/100
                    <Progress value={result.seoScore} className="mt-2" />
                  </div>
                )
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Suggestions</CardTitle>
                {result && (
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(result.suggestions.join('\n'), 'suggestions')}>
                    <Clipboard className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              ) : (
                result && (
                  <ul className="list-disc list-inside text-foreground/90 space-y-1">
                    {result.suggestions.map((suggestion, i) => <li key={i}>{suggestion}</li>)}
                  </ul>
                )
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
               <div className="flex justify-between items-center">
                <CardTitle>Rewritten Content</CardTitle>
                {result && (
                  <Button variant="ghost" size="icon" onClick={() => handleCopy(result.rewrittenContent, 'rewritten content')}>
                    <Clipboard className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              ) : (
                result && <p className="whitespace-pre-wrap text-foreground/90">{result.rewrittenContent}</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
