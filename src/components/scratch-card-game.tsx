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
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | undefined>(undefined);
  const [isScratched, setIsScratched] = useState(false);
  const [position, setPosition] = useState<SexPosition | null>(null);

  const getRandomPosition = useCallback(() => {
    setPosition(smartShuffle('sexPositions', sexPositions));
  }, []);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !position) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    ctx.scale(dpr, dpr);

    // Draw the scratchable overlay
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, '#8B0000');
    gradient.addColorStop(1, '#B76E79');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.globalCompositeOperation = 'destination-out';
    setIsScratched(false);
  }, [position]);

  useEffect(() => {
    getRandomPosition();
  }, [getRandomPosition]);

  useEffect(() => {
    setupCanvas();
  }, [setupCanvas]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => {
      setupCanvas();
    });
    ro.observe(container);
    return () => {
      ro.disconnect();
    };
  }, [setupCanvas]);

  const scratchLine = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const brushSize = 32;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (!lastPointRef.current) {
      lastPointRef.current = { x, y };
    }
    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastPointRef.current = { x, y };
  };

  const computeScratched = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const imageData = ctx.getImageData(0, 0, Math.floor(canvas.width / dpr), Math.floor(canvas.height / dpr));
    const pixelData = imageData.data;
    let transparentPixels = 0;
    for (let i = 3; i < pixelData.length; i += 4) {
      if (pixelData[i] === 0) {
        transparentPixels++;
      }
    }
    const totalPixels = (imageData.width * imageData.height);
    const scratchedPercentage = (transparentPixels / totalPixels) * 100;
    if (scratchedPercentage > 35) {
      setIsScratched(true);
    }
  };

  const getPointFromEvent = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    const { x, y } = getPointFromEvent(e);
    lastPointRef.current = { x, y };
    scratchLine(x, y);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const { x, y } = getPointFromEvent(e);
    scratchLine(x, y);
  };

  const endStroke = () => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    computeScratched();
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
        <div
          ref={containerRef}
          className={cn("relative w-full rounded-lg overflow-hidden border-2 border-dashed", isScratched && 'border-[#B76E79]')}
          style={{ aspectRatio: aspectRatio ?? 16 / 9 }}
        >
          <Image
            src={position.image.imageUrl}
            alt={position.name}
            fill
            className="object-contain"
            data-ai-hint={position.image.imageHint}
            unoptimized
            onLoadingComplete={(img) => {
              if (img.naturalWidth && img.naturalHeight) {
                setAspectRatio(img.naturalWidth / img.naturalHeight);
              }
            }}
          />
          <canvas
            ref={canvasRef}
            className={cn("absolute inset-0 cursor-pointer transition-opacity duration-500 touch-none select-none", isScratched && 'opacity-0 pointer-events-none')}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endStroke}
            onPointerLeave={endStroke}
            onPointerCancel={endStroke}
          />
          {!isScratched && (
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-2xl font-bold text-[#F5F5DC] drop-shadow-lg bg-[#8B0000]/60 px-3 py-1 rounded">
                  SCRATCH HERE
                </p>
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
