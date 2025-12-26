'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import Image from 'next/image';
import { sexPositions, SexPosition } from '@/lib/sex-positions';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { smartShuffle } from '@/lib/utils';

export function ScratchCardGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [position, setPosition] = useState<SexPosition | null>(null);

  const getRandomPosition = useCallback(() => {
    setPosition(smartShuffle('sexPositions', sexPositions));
  }, []);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !position) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw the scratchable overlay
    ctx.fillStyle = '#d1d5db'; // gray-300
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'destination-out';
    setIsScratched(false);
  }, [position]);

  useEffect(() => {
    getRandomPosition();
  }, [getRandomPosition]);

  useEffect(() => {
    setupCanvas();
  }, [setupCanvas]);

  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2, true);
    ctx.fill();

    // Check how much is scratched
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelData = imageData.data;
    let transparentPixels = 0;
    for (let i = 3; i < pixelData.length; i += 4) {
      if (pixelData[i] === 0) {
        transparentPixels++;
      }
    }
    const scratchedPercentage = (transparentPixels / (canvas.width * canvas.height)) * 100;
    if (scratchedPercentage > 50) {
      setIsScratched(true);
    }
  };

  const handleReset = () => {
    getRandomPosition();
    // setupCanvas will be called by the useEffect hook when `position` changes
  };

  if (!position) return null;

  return (
    <Card className="w-full max-w-md mx-auto text-center">
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Scratch of Fate</CardTitle>
        <CardDescription>Scratch the card to reveal a spontaneous position to try.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={cn("relative w-full aspect-video rounded-lg overflow-hidden border-2 border-dashed", isScratched && 'border-accent')}>
          <Image
            src={position.image.imageUrl}
            alt={position.name}
            fill
            className="object-cover"
            data-ai-hint={position.image.imageHint}
            unoptimized
          />
          <canvas
            ref={canvasRef}
            className={cn("absolute inset-0 cursor-pointer transition-opacity duration-500", isScratched && 'opacity-0 pointer-events-none')}
            onMouseMove={handleScratch}
            onTouchMove={handleScratch}
          />
          {!isScratched && (
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-2xl font-bold text-background drop-shadow-lg">SCRATCH HERE</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className={cn("text-center transition-opacity duration-500", isScratched ? 'opacity-100' : 'opacity-0')}>
            <h3 className="font-headline text-2xl text-primary">{position.name}</h3>
            <p className="text-muted-foreground mt-1">{position.description}</p>
        </div>
        <Button onClick={handleReset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Get New Card
        </Button>
      </CardFooter>
    </Card>
  );
}
