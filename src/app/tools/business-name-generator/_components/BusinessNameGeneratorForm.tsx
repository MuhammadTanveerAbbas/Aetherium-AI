"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateBusinessName } from "@/ai/flows/generate-business-name";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Clipboard, ClipboardCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  description: z.string().min(10, "Description must be at least 10 characters long."),
  keywords: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function BusinessNameGeneratorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      keywords: "",
    },
  });
  
  const handleCopy = (name: string) => {
    navigator.clipboard.writeText(name);
    setCopiedName(name);
    toast({
      title: "Copied!",
      description: `"${name}" has been copied to your clipboard.`,
    });
    setTimeout(() => setCopiedName(null), 2000);
  };


  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setGeneratedNames([]);
    try {
      const result = await generateBusinessName(values);
      setGeneratedNames(result.names);
    } catch (error) {
      console.error("Error generating names:", error);
      toast({
        title: "Error",
        description: "Failed to generate business names. Please try again.",
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
          <CardTitle>Business Details</CardTitle>
          <CardDescription>Describe your business and add keywords to generate name ideas.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., A subscription box for eco-friendly dog toys and treats."
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
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keywords (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., sustainable, organic, pet, joy" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Names
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(isLoading || generatedNames.length > 0) && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Generated Names</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {generatedNames.map((name, index) => (
                  <li key={index} className="flex items-center justify-between text-foreground/90 bg-secondary p-3 rounded-md">
                    <span className="font-medium">{name}</span>
                    <Button variant="ghost" size="icon" onClick={() => handleCopy(name)}>
                      {copiedName === name ? (
                        <ClipboardCheck className="h-4 w-4 text-primary" />
                      ) : (
                        <Clipboard className="h-4 w-4" />
                      )}
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
