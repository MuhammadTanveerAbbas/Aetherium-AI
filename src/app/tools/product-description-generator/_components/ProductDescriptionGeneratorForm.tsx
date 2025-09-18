"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateProductDescription, type GenerateProductDescriptionOutput } from "@/ai/flows/generate-product-description";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Clipboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  productName: z.string().min(3, "Product name must be at least 3 characters long."),
  features: z.string().min(10, "Features must be at least 10 characters long."),
  tone: z.string().min(1, "Please select a tone of voice."),
});

type FormValues = z.infer<typeof formSchema>;

function descriptionToPlainText(description: GenerateProductDescriptionOutput): string {
  let text = `${description.headline}\n\n`;
  text += `${description.paragraph}\n\n`;
  text += `Features:\n`;
  text += description.features.map(f => `* ${f}`).join('\n');
  return text;
}

export function ProductDescriptionGeneratorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateProductDescriptionOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      features: "",
      tone: "professional",
    },
  });
  
  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(descriptionToPlainText(result));
      toast({
        title: "Copied!",
        description: "The description has been copied to your clipboard.",
      });
    }
  };


  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    try {
      const descriptionResult = await generateProductDescription(values);
      setResult(descriptionResult);
    } catch (error) {
      console.error("Error generating description:", error);
      toast({
        title: "Error",
        description: "Failed to generate the product description. Please try again.",
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
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Provide product details and let AI craft a compelling description.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Wireless Noise Cancelling Headphones" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Features</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 40 hour battery life, Bluetooth 5.0, Active Noise Cancellation, foldable design"
                        rows={4}
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
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tone of Voice</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a tone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="witty">Witty</SelectItem>
                        <SelectItem value="persuasive">Persuasive</SelectItem>
                        <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                        <SelectItem value="informative">Informative</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                        <SelectItem value="luxurious">Luxurious</SelectItem>
                        <SelectItem value="adventurous">Adventurous</SelectItem>
                        <SelectItem value="minimalist">Minimalist</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Description
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(isLoading || result) && (
        <Card className="mt-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Generated Description</CardTitle>
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
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              result && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold font-headline">{result.headline}</h3>
                  </div>
                  <div className="space-y-2">
                     <p className="text-foreground/90">{result.paragraph}</p>
                  </div>
                   <div className="space-y-2">
                    <h4 className="font-semibold">Key Features</h4>
                    <ul className="list-disc list-inside text-foreground/90 space-y-1">
                      {result.features.map((feature, i) => <li key={i}>{feature}</li>)}
                    </ul>
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
