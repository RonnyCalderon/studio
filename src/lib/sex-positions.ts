import { placeholderImages, type ImagePlaceholder } from './placeholder-images';

export interface SexPosition {
  name: string;
  description: string;
  image: ImagePlaceholder;
}

const sensualImages = placeholderImages.filter(p => p.imageHint.includes('sensual'));

export const sexPositions: SexPosition[] = [
  {
    name: 'The Lotus',
    description: 'A position of intimacy and connection. Sit facing each other, legs wrapped around your partner\'s waist, and sync your movements and breath.',
    image: sensualImages[0] || placeholderImages[0],
  },
  {
    name: 'The Standing Wheelbarrow',
    description: 'A playful and adventurous position. One partner stands and holds the other\'s legs as they support themselves on their hands.',
    image: sensualImages[1] || placeholderImages[0],
  },
  {
    name: 'The G-Whiz',
    description: 'Designed for her pleasure. Lie on your back with your legs raised and resting on your partner\'s shoulders for deep G-spot stimulation.',
    image: sensualImages[2] || placeholderImages[0],
  },
  {
    name: 'The Reverse Cowgirl',
    description: 'A position of power and control. She straddles him, facing away, controlling the pace and depth of penetration.',
    image: sensualImages[3] || placeholderImages[0],
  },
  {
    name: 'The Butter Churner',
    description: 'For the flexible and adventurous. She lies on her back with legs straight up in the air as he kneels and enters from above.',
    image: sensualImages[0] || placeholderImages[0],
  },
   {
    name: 'The 69',
    description: 'A classic for a reason. Both partners give and receive oral pleasure simultaneously, a true feast for the senses.',
    image: sensualImages[1] || placeholderImages[0],
  },
];
