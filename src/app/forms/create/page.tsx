import { auth } from "@/server/auth/config";
import { redirect } from "next/navigation";
import { NotionDatabaseSelector } from "@/app/_components/notion/NotionDatabaseSelector";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CreateFormPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/dashboard">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      {/* Notion Database Selector */}
      <NotionDatabaseSelector />
    </div>
  );
}