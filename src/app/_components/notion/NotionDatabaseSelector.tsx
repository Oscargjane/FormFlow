"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { InfoIcon, Search, RefreshCw, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { NotionIcon } from "@/app/_components/notion/NotionIcon";

// Define the structure of a Notion database
interface Database {
  id: string;
  name: string;
  icon: string | null;
}

export function NotionDatabaseSelector() {
  const [selectedDatabaseId, setSelectedDatabaseId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();

  // Fetch Notion databases available to the user
  const { data, isLoading, refetch } = api.notion.listDatabases.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  // Refreshes the database list
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  // Redirects to the form creation page with the selected database
  const handleContinue = () => {
    if (selectedDatabaseId) {
      router.push(`/forms/create/${selectedDatabaseId}`);
    }
  };

  // Filters databases based on user input
  const filteredDatabases = data?.databases?.filter((db) =>
    db.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Show loading state while fetching databases
  if (isLoading) {
    return <LoadingState />;
  }

  // Show empty state if no databases are available
  if (!data?.databases || data.databases.length === 0) {
    return <EmptyState onRefresh={handleRefresh} isRefreshing={isRefreshing} />;
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="shadow-md border-border/30 bg-card/90 backdrop-blur-sm overflow-hidden">
        <CardHeader className="text-center border-b border-border/20 bg-card/80 pb-4">
          <CardTitle className="text-xl mb-1 flex items-center justify-center gap-2">
            Select a
            <Image 
              width={24}
              height={24}
              src="/notion-logo.svg"
              alt="Notion"
              className="inline-block invert"
              priority
            />
            Notion Database
          </CardTitle>
          <CardDescription>
            Choose a database to apply logic and validations to your form responses.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search databases..."
              className="pl-9 bg-muted/30 border-border/30 focus:border-primary/50 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Database selection list */}
          <DatabaseList
            databases={filteredDatabases}
            selectedDatabaseId={selectedDatabaseId}
            setSelectedDatabaseId={setSelectedDatabaseId}
            searchTerm={searchTerm}
          />

          {/* Refresh message */}
          <div className="text-center">
            <button
              onClick={handleRefresh}
              className="text-xs text-muted-foreground hover:text-primary inline-flex items-center transition-colors"
            >
              <RefreshCw className={`h-3 w-3 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
              Not seeing your database? Refresh the list.
            </button>
          </div>
        </CardContent>

        <CardFooter className="border-t border-border/20 bg-card/80 p-4">
          <Button className="w-full" disabled={!selectedDatabaseId} onClick={handleContinue}>
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

// Displays the list of available databases
function DatabaseList({
  databases,
  selectedDatabaseId,
  setSelectedDatabaseId,
  searchTerm,
}: {
  databases: Database[];
  selectedDatabaseId: string | null;
  setSelectedDatabaseId: (id: string) => void;
  searchTerm: string;
}) {
  return (
    <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
      {databases.length > 0 ? (
        databases.map((database) => (
          <div
            key={database.id}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-all border ${
              selectedDatabaseId === database.id ? "bg-primary/10 border-primary/30" : "hover:bg-muted/30 border-transparent"
            }`}
            onClick={() => setSelectedDatabaseId(database.id)}
          >
            <div className="mr-3 text-muted-foreground">
              <NotionIcon icon={database.icon} />
            </div>
            <div className="flex-1">
              <p className="font-medium">{database.name}</p>
            </div>
            {selectedDatabaseId === database.id && <Check className="h-4 w-4 text-primary" />}
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-muted-foreground">
          No databases found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
}

// Displays a loading state while fetching databases
function LoadingState() {
  return (
    <div className="max-w-md mx-auto">
      <Card className="shadow-md border-border/30 bg-card/90 backdrop-blur-sm">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-10 w-full" />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    </div>
  );
}

// Displays an empty state when no databases are found
function EmptyState({ onRefresh, isRefreshing }: { onRefresh: () => void; isRefreshing: boolean }) {
  return (
    <div className="max-w-md mx-auto">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>No databases found</AlertTitle>
        <AlertDescription>Please create a database in Notion before continuing.</AlertDescription>
      </Alert>
      <Button variant="outline" onClick={onRefresh} disabled={isRefreshing} className="w-full mt-4">
        Refresh List
      </Button>
    </div>
  );
}