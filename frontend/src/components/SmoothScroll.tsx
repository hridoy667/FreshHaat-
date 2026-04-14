'use client';

// The new import path is much cleaner
import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1, 
        duration: 1.5, 
        smoothWheel: true,
        // Optional: keeps the scroll feeling consistent across different devices
        wheelMultiplier: 1, 
      }}
    >
      {children}
    </ReactLenis>
  );
}