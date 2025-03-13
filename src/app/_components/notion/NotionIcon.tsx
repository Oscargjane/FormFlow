"use client";

import Image from "next/image";
import { Database } from "lucide-react";

interface NotionIconProps {
  icon: string | null;
}

export const NotionIcon: React.FC<NotionIconProps> = ({ icon }) => {
  // Default fallback icon
  if (!icon) return <Database className="h-5 w-5" />;

  // If the icon is an emoji (typically a single character)
  if (icon.length === 1) return <span className="text-lg">{icon}</span>;

  // If the icon is a URL (Notion's uploaded icons)
  if (icon.startsWith("http")) {
    return (
      <Image
        src={icon}
        alt="Database icon"
        width={20}
        height={20}
        className="object-contain"
        unoptimized // Prevents Next.js from optimizing external Notion images
      />
    );
  }

  return <Database className="h-5 w-5" />;
};