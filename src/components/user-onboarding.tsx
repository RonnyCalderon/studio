'use client';

import { useState } from 'react';
import { useUser } from '@/context/user-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Flame } from 'lucide-react';

export function UserOnboarding() {
  const { saveUser } = useUser();
  const [userName, setUserName] = useState('');
  const [partnerName, setPartnerName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim() && partnerName.trim()) {
      saveUser(userName.trim(), partnerName.trim());
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
            <Flame className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="font-headline text-3xl mt-4">Welcome to Ignite</CardTitle>
          <CardDescription className="text-base pt-2">
            Let's personalize your journey. Tell us who you are so we can tailor this experience for you.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="your-name" className="text-base">Your Name</Label>
              <Input
                id="your-name"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="h-12 text-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="partner-name" className="text-base">Your Partner's Name</Label>
              <Input
                id="partner-name"
                placeholder="Enter your partner's name"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                required
                className="h-12 text-lg"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full h-12 text-lg font-bold" disabled={!userName || !partnerName}>
              Begin Our Adventure
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
