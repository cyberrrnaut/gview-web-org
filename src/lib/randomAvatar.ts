

import { createAvatar } from '@dicebear/core';
import { botttsNeutral } from '@dicebear/collection';
 
// Define the possible values for each style type
type EyeStyles = 'bulging' | 'dizzy' | 'eva' | 'frame1' | 'frame2' | 'glow' | 'happy' | 'hearts' | 'robocop' | 'round' | 'roundFrame01' | 'roundFrame02' | 'sensor' | 'shade01';
type MouthStyles = 'bite' | 'diagram' | 'grill01' | 'grill02' | 'grill03' | 'smile01' | 'smile02' | 'square01' | 'square02';
type BackgroundColors = 'b6e3f4' | 'c0aede' | 'd1d4f9' | 'ffd5dc' | 'ffdfbf';

 
const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const GenerateUniqueAvatar = () => {
  // Randomly select one eye style, one mouth style, and one background color
  const randomEye = getRandomItem<EyeStyles>([
    'bulging', 'dizzy', 'eva', 'frame1', 'frame2', 'glow', 'happy', 'hearts', 'robocop', 'round', 
    'roundFrame01', 'roundFrame02', 'sensor', 'shade01'
  ]);

  const randomMouth = getRandomItem<MouthStyles>([
    'bite', 'diagram', 'grill01', 'grill02', 'grill03', 'smile01', 'smile02', 'square01', 'square02'
  ]);

  const randomBackgroundColor = getRandomItem<BackgroundColors>([
    'b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf'
  ]);

  // Generate the avatar SVG using DiceBear
  const avatar = createAvatar(botttsNeutral, {
    eyes: [randomEye], // Pass the random eye style as an array
    mouth: [randomMouth], // Pass the random mouth style as an array
    backgroundColor: [randomBackgroundColor], // Pass the random background color as an array
    radius: 50, // Rounded corners
  });

  // Convert SVG to base64 safely
  const svg = avatar.toString();
  const svgBase64 = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;

  return  svgBase64;
};
