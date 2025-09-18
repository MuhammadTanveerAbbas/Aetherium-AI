"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateArticleFromBrief, type GenerateArticleFromBriefOutput } from "@/ai/flows/generate-article-from-brief";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Clipboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  brief: z.string().min(10, "Brief must be at least 10 characters long."),
  seoKeywords: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

function articleToPlainText(article: GenerateArticleFromBriefOutput): string {
  let text = `${article.title}\n\n`;
  text += `${article.introduction}\n\n`;
  article.sections.forEach(section => {
    text += `${section.subheading}\n`;
    text += `${section.content}\n\n`;
  });
  text += `Conclusion\n`;
  text += `${article.conclusion}\n`;
  return text;
}


export function BlogWriterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateArticleFromBriefOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brief: "",
      seoKeywords: "",
    },
  });
  
  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(articleToPlainText(result));
      toast({
        title: "Copied!",
        description: "The article has been copied to your clipboard.",
      });
    }
  };


  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    try {
      const articleResult = await generateArticleFromBrief(values);
      setResult(articleResult);
    } catch (error) {
      console.error("Error generating article:", error);
      toast({
        title: "Error",
        description: "Failed to generate the article. Please try again.",
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
          <CardTitle>Article Details</CardTitle>
          <CardDescription>Provide a brief and optional keywords, and let AI do the writing.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="brief"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Article Brief</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., An article about the benefits of remote work for small businesses..."
                        rows={5}
                        {...field}
                        className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seoKeywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SEO Keywords (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., remote work, productivity, small business" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Article
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(isLoading || result) && (
        <Card className="mt-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Generated Article</CardTitle>
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
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Separator className="my-4"/>
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              result && (
                <article className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
                  <h2 className="text-2xl sm:text-3xl font-bold font-headline">{result.title}</h2>
                  <p className="text-lg text-muted-foreground">{result.introduction}</p>
                  <Separator className="my-6"/>
                  {result.sections.map((section, index) => (
                    <div key={index} className="mb-6">
                      <h3 className="text-xl sm:text-2xl font-semibold font-headline">{section.subheading}</h3>
                      <p>{section.content}</p>
                    </div>
                  ))}
                   <Separator className="my-6"/>
                  <h3 className="text-xl sm:text-2xl font-semibold font-headline">Conclusion</h3>
                  <p>{result.conclusion}</p>
                </article>
              )
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
