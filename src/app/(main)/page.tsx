
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Zap, BrainCircuit, User, BarChart, Rocket, Wand2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const valueProps = [
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: "AI Powered Automation",
    description: "Leverage cutting edge AI to automate content creation and optimization, saving you time and resources.",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Instant Results",
    description: "Generate high quality articles, SEO insights, and stunning visuals in seconds, not hours.",
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: "Creative Enhancement",
    description: "Go beyond simple generation. Our tools are designed to be your creative partner, enhancing your ideas.",
  },
];

const toolPreviews = [
  { name: "AI Blog Writer", description: "Generate full articles from simple briefs.", href: "/tools/blog-writer" },
  { name: "SEO Optimizer", description: "Analyze and improve your content's SEO score.", href: "/tools/seo-optimizer" },
  { name: "Video Script Generator", description: "Create engaging scripts for your videos.", href: "/tools/video-script-generator" },
];

const testimonials = [
  {
    name: "Alex Johnson",
    title: "Content Strategist",
    icon: <User className="h-10 w-10 text-primary" />,
    testimonial: "Aetherium AI revolutionized our content workflow, producing high quality drafts in minutes. It is like having a team of writers on standby 24/7, a true game changer for our content strategy.",
  },
  {
    name: "Samantha Lee",
    title: "Digital Marketer",
    icon: <BarChart className="h-10 w-10 text-primary" />,
    testimonial: "The SEO Optimizer is pure magic. We have seen tangible improvements in our search rankings. The suggestions are insightful, easy to implement, and have been invaluable for our marketing efforts.",
  },
  {
    name: "David Chen",
    title: "Startup Founder",
    icon: <Rocket className="h-10 w-10 text-primary" />,
    testimonial: "As a lean startup, efficiency is key. Aetherium AI is our secret weapon for content. The Image Generator creates beautiful, on brand visuals, saving us a fortune on stock photography fees.",
  },
];

const faqs = [
  {
    question: "Do I need technical skills to use Aetherium AI?",
    answer: "Not at all! Our platform is designed for everyone. Its intuitive interface allows you to start creating high quality content immediately, no matter your skill level."
  },
  {
    question: "Can I use the content I create for my business?",
    answer: "Absolutely. You have full commercial rights to all content and images generated. Use them for your marketing, website, social media, and any other business needs."
  },
  {
    question: "How does the AI create unique content?",
    answer: "Our advanced AI models are trained to generate original content from scratch based on your inputs. For added assurance, you can always use a plagiarism checker."
  },
  {
    question: "What if I'm not happy with the first result?",
    answer: "No problem. Our tools are built for iteration. You can easily refine your prompts, adjust settings, or ask the AI to generate new versions until you get the perfect outcome."
  },
  {
    question: "What kind of content can I create?",
    answer: "Aetherium AI offers a versatile suite of tools. You can write blog posts, optimize articles for SEO, generate stunning images, and much more. We are constantly adding new tools to expand your creative possibilities."
  }
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
<section className="w-full py-20 md:py-28 lg:py-32">
  <div className="container px-4 md:px-6 text-center">
    <div
      className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-primary shadow-lg ring-1 ring-primary/20 transition-all hover:bg-secondary/90 hover:shadow-primary/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary mb-6"
    >
      <Wand2 className="h-4 w-4" />
      <span>Discover Our Suite of AI Tools</span>
    </div>

    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
      Unleash Your Creative Superpowers
    </h1>

    <p className="mx-auto max-w-[700px] text-lg sm:text-xl md:text-xl text-muted-foreground my-6">
      Your all in one AI toolkit designed to make content creation simple, faster, 
      and more effective. Easily create, improve, and optimize your ideas while 
      boosting your workflow with powerful automation.
    </p>

    <Button size="lg" asChild>
      <Link href="/tools">Explore Tools</Link>
    </Button>
  </div>
</section>


      {/* Value Props Section */}
      <section className="w-full pt-20 pb-12 md:pt-32 md:pb-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {valueProps.map((prop) => (
              <div key={prop.title} className="text-center">
                <div className="flex justify-center mb-4">{prop.icon}</div>
                <h3 className="text-xl font-bold font-headline mb-2">{prop.title}</h3>
                <p className="text-muted-foreground">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Previews Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl font-headline mb-12">
            Our Powerful Suite of Tools
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {toolPreviews.map((tool) => (
              <Card key={tool.name} className="hover:shadow-lg hover:border-primary/50 transition-all flex flex-col">
                <CardHeader>
                  <CardTitle className="font-headline">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-muted-foreground flex-grow">{tool.description}</p>
                  <Button variant="link" asChild className="p-0 mt-4 self-start">
                    <Link href={tool.href}>
                      Try now &rarr;
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 bg-secondary">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl font-headline mb-12">
            What Our Users Say
          </h2>
          <div className="grid gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="flex flex-col">
                <CardContent className="pt-6 flex-grow flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 mr-4 flex items-center justify-center">
                      {testimonial.icon}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                  <blockquote className="text-muted-foreground flex-grow">
                    "{testimonial.testimonial}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Step Explanation Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl font-headline mb-12">
            Get Started in 3 Easy Steps
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary text-primary-foreground font-bold text-2xl">1</div>
              <h3 className="text-xl font-bold font-headline mb-2">Choose a Tool</h3>
              <p className="text-muted-foreground">Select from our wide range of AI powered tools to fit your specific need.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary text-primary-foreground font-bold text-2xl">2</div>
              <h3 className="text-xl font-bold font-headline mb-2">Provide Your Input</h3>
              <p className="text-muted-foreground">Enter a simple brief, text, or a prompt. Let our AI understand your context.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary text-primary-foreground font-bold text-2xl">3</div>
              <h3 className="text-xl font-bold font-headline mb-2">Generate & Refine</h3>
              <p className="text-muted-foreground">Get instant results and refine them as needed. Your perfect content is just a click away.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 bg-secondary">
        <div className="container px-4 md:px-6 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl font-headline mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index + 1}`} key={faq.question}>
                <AccordionTrigger className="text-lg font-semibold text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
