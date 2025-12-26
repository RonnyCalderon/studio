
import { NextRequest, NextResponse } from 'next/server';
import { generateWeeklyChallenge } from '@/ai/flows/generate-weekly-challenge';

export const dynamic = 'force-dynamic'; 

export async function POST(req: NextRequest) {
  try {
    const { category } = await req.json();
    if (!category || !['love', 'adventurous', 'sexy'].includes(category)) {
      return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }
    const result = await generateWeeklyChallenge({ category });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating challenge:', error);
    return NextResponse.json({ error: 'Failed to generate challenge' }, { status: 500 });
  }
}
