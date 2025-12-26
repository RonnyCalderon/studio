'use client';

import { Share2 } from "lucide-react";
import { useEffect, useState } from "react";

export function AddToHomeScreen() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // This will now show the prompt on any device after a short delay,
    // making it visible in the development environment.
    const timer = setTimeout(() => {
        const isInStandaloneMode = () => 'standalone' in window.navigator && (window.navigator as any).standalone;
        if (!isInStandaloneMode()) {
            setShowPrompt(true);
        }
    }, 2000); // Show after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50">
        <div className="bg-background border border-border rounded-xl shadow-lg p-4 max-w-xs text-sm text-foreground animate-in slide-in-from-bottom-10 fade-in-50 duration-500">
            <p className="font-bold mb-2">Get the Full App Experience!</p>
            <p className="text-muted-foreground">
                For easy access on your phone, add this app to your Home Screen. Tap the Share icon
                <Share2 className="inline-block mx-1 h-4 w-4" />
                and then select 'Add to Home Screen'.
            </p>
        </div>
    </div>
  );
}
