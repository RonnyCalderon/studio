'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Heart, Play, Flame, CalendarPlus } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { placeholderImages, type ImagePlaceholder } from "@/lib/placeholder-images";
import { type Challenge } from "@/lib/hooks/use-weekly-challenge";
import { Separator } from "./ui/separator";
import { atcb_action } from 'add-to-calendar-button';

interface ChallengeCardProps {
  challenge: Challenge;
  expiry: number | null; // Can be null if timer hasn't started
  onStart: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const Countdown = ({ expiry }: { expiry: number }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = Date.now();
            const distance = expiry - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, [expiry]);

    return (
        <div className="flex items-center gap-4 text-center">
            <div>
                <span className="text-2xl font-bold font-headline">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="block text-xs text-muted-foreground">Days</span>
            </div>
            <div>
                <span className="text-2xl font-bold font-headline">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="block text-xs text-muted-foreground">Hours</span>
            </div>
            <div>
                <span className="text-2xl font-bold font-headline">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="block text-xs text-muted-foreground">Minutes</span>
            </div>
            <div>
                <span className="text-2xl font-bold font-headline">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="block text-xs text-muted-foreground">Seconds</span>
            </div>
        </div>
    );
};

const SpicyLevel = ({ level }: { level: number }) => {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
                <Flame key={i} className={`h-5 w-5 ${i < level ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
            ))}
        </div>
    );
};

const AddToCalendarButton = ({className, ...props}: React.ComponentProps<typeof Button> & { config: Parameters<typeof atcb_action>[0] }) => {
  const { config, ...rest } = props;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    atcb_action(config, buttonRef.current!);
  };

  return (
    <Button ref={buttonRef} onClick={handleClick} {...rest}>
      {props.children}
    </Button>
  );
}

export function ChallengeCard({ challenge, expiry, onStart, onComplete, isCompleted }: ChallengeCardProps) {
  const [challengeImage, setChallengeImage] = useState<ImagePlaceholder | null>(null);
  
  const getChallengeImage = () => {
    // Select a random image when the component mounts or challenge changes
    const challengeImages = placeholderImages.filter(img => img.imageHint.includes('couple'));
    const randomImage = challengeImages[Math.floor(Math.random() * challengeImages.length)];
    setChallengeImage(randomImage);
  }

  useEffect(() => {
    getChallengeImage();
  }, [challenge]);

  if (!challengeImage) {
      return null;
  }

  const isTimerRunning = expiry !== null;
  const formattedPersuasionScript = challenge.persuasionScript
    .replace(/\n/g, '<br />')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/<br \/>\*/g, '<ul><li>')
    .replace(/\* /g, '<li>')
    .replace(/<br \/>$/, '') + '</ul>';

  return (
    <Card className="w-full max-w-3xl mx-auto overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-transform duration-300">
      <div className="relative h-64 w-full">
         <Image
            src={challengeImage.imageUrl}
            alt={challengeImage.description}
            fill
            className="object-cover"
            data-ai-hint={challengeImage.imageHint}
            onError={getChallengeImage}
            unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-lg">
            <SpicyLevel level={challenge.spicyLevel} />
        </div>
        <div className="absolute bottom-0 left-0 p-6">
            <CardTitle className="font-headline text-3xl text-white drop-shadow-lg">Weekly Challenge</CardTitle>
        </div>
      </div>
      <CardContent className="p-6 text-center space-y-6">
        <p className="text-xl lg:text-2xl font-body leading-relaxed text-foreground/90">
          "{challenge.text}"
        </p>
        
        <div className="text-left bg-muted/30 p-4 rounded-lg prose prose-sm max-w-none text-foreground/80 italic prose-strong:text-foreground/90 prose-ul:list-disc prose-ul:pl-5 prose-li:mb-2">
          <div dangerouslySetInnerHTML={{ __html: `"${formattedPersuasionScript}"`}} />
        </div>

        {isTimerRunning && expiry && (
          <>
            <Separator className="my-6" />
            <div className="flex flex-col items-center gap-4 pt-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5" />
                    <span>Time Remaining</span>
                </div>
                <Countdown expiry={expiry} />
                <AddToCalendarButton
                    config={{
                      name: `Weekly Challenge: ${challenge.text}`,
                      description: `"${challenge.text}"\n\nHere's a little script to get things started:\n${challenge.persuasionScript.replace(/<br \/>/g, '\n').replace(/<\/?strong>/g, '').replace(/<\/?ul>/g, '').replace(/<li>/g, '\n- ')}`,
                      startDate: new Date(expiry - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                      endDate: new Date(expiry).toISOString().split('T')[0],
                      options: ['Apple','Google','Outlook.com'],
                      alarms: [
                        {
                          trigger: 'P1D',
                          type: 'display',
                          description: 'Check-in on your weekly challenge!'
                        },
                        {
                          trigger: 'P3D',
                          type: 'display',
                          description: 'Halfway through the challenge week!'
                        },
                        {
                          trigger: '-PT1H',
                          type: 'display',
                          description: 'Only 1 hour left for your challenge!'
                        }
                      ],
                    }}
                    variant="outline"
                    className="font-bold mt-4"
                  >
                    <CalendarPlus className="mr-2 h-5 w-5" />
                    Add to Calendar
                </AddToCalendarButton>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="p-6 bg-muted/50 flex flex-col sm:flex-row justify-center items-center gap-4">
        {isCompleted ? (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle className="h-6 w-6"/>
                <span className="text-lg font-semibold">Challenge Completed!</span>
            </div>
        ) : isTimerRunning ? (
            <Button size="lg" onClick={onComplete} className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg shadow-lg transform hover:scale-105 transition-transform">
                <Heart className="mr-2 h-5 w-5" />
                We Did It!
            </Button>
        ) : (
          <Button size="lg" onClick={onStart} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-lg transform hover:scale-105 transition-transform">
              <Play className="mr-2 h-5 w-5" />
              Start Challenge
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
