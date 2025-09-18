"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Tool } from "@/app/lib/tools";
import { cn } from "@/lib/utils";
import { useLoading } from "@/context/LoadingContext";
import React from "react";
import * as icons from "lucide-react";

type IconName = keyof typeof icons;

const Icon = ({ name, className }: { name: string; className?: string }) => {
    const LucideIcon = icons[name as IconName] as React.ElementType;
    if (!LucideIcon) return null;
    return <LucideIcon className={className} />;
};


export function ToolCard({ name, description, href, iconName, disabled }: Tool) {
  const router = useRouter();
  const { setIsLoading } = useLoading();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    
    e.preventDefault();
    setIsLoading(true);
    router.push(href);
  };

  const cardContent = (
    <Card
      className={cn(
        "h-full transition-all cursor-pointer",
        disabled
          ? "cursor-not-allowed bg-secondary/50"
          : "hover:shadow-lg hover:border-primary/50"
      )}
      onClick={handleClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium font-headline">{name}</CardTitle>
        <Icon name={iconName} className="h-6 w-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        {disabled && <div className="mt-4 text-xs font-semibold text-primary">Coming Soon</div>}
      </CardContent>
    </Card>
  );

  return cardContent;
}