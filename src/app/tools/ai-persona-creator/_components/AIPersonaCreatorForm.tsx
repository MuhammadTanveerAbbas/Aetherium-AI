"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateAIPersona, type GenerateAIPersonaOutput } from "@/ai/flows/generate-ai-persona";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Clipboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const formSchema = z.object({
  productInfo: z.string().min(10, "Product information must be at least 10 characters long."),
  targetAudience: z.string().min(10, "Target audience must be at least 10 characters long."),
});

type FormValues = z.infer<typeof formSchema>;

function personaToPlainText(personaOutput: GenerateAIPersonaOutput): string {
  const { persona } = personaOutput;
  let text = `Name: ${persona.name}\n`;
  text += `Age: ${persona.age}\n`;
  text += `Occupation: ${persona.occupation}\n\n`;
  text += `Background:\n${persona.background}\n\n`;
  text += `Goals:\n${persona.goals.map(g => `* ${g}`).join('\n')}\n\n`;
  text += `Pain Points:\n${persona.painPoints.map(p => `* ${p}`).join('\n')}\n\n`;
  text += `Marketing Message:\n"${persona.marketingMessage}"\n`;
  return text;
}


export function AIPersonaCreatorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateAIPersonaOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productInfo: "",
      targetAudience: "",
    },
  });
  
  const handleCopy = () => {
    if (result) {
      const textToCopy = personaToPlainText(result);
      navigator.clipboard.writeText(textToCopy);
      toast({
        title: "Copied!",
        description: "Persona details have been copied to your clipboard.",
      });
    }
  };


  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setResult(null);
    try {
      const personaResult = await generateAIPersona(values);
      setResult(personaResult);
    } catch (error) {
      console.error("Error generating persona:", error);
      toast({
        title: "Error",
        description: "Failed to generate AI persona. Please try again.",
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
          <CardTitle>Persona Details</CardTitle>
          <CardDescription>Describe your product and target audience to generate a detailed user persona.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="productInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product/Business Information</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., A mobile app for budget tracking and financial planning for millennials." rows={5} {...field} className="resize-none"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Young professionals aged 25-35 who are looking to save money and invest for the future." rows={5} {...field} className="resize-none"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Persona
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {(isLoading || result) && (
        <Card className="mt-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Generated AI Persona</CardTitle>
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
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              result && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold">{result.persona.name}</h3>
                    <p className="text-sm text-muted-foreground">{result.persona.age}, {result.persona.occupation}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Background</h4>
                    <p className="text-foreground/90">{result.persona.background}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Goals</h4>
                    <ul className="list-disc list-inside text-foreground/90 space-y-1">
                      {result.persona.goals.map((goal, i) => <li key={i}>{goal}</li>)}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Pain Points</h4>
                    <ul className="list-disc list-inside text-foreground/90 space-y-1">
                      {result.persona.painPoints.map((point, i) => <li key={i}>{point}</li>)}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Marketing Message</h4>
                    <p className="text-foreground/90 italic">"{result.persona.marketingMessage}"</p>
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
