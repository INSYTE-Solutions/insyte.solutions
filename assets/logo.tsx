import Image from 'next/image';
import { useRef, useEffect } from 'react';

export function InsyteLogo({className}: {className?: string}) {
  return (
    <div className={className} style={{ position: "relative" }}>
      <Image
        src="/assets/logo-transparent.png"
        alt="Logo"
        width={100}
        height={100}
      />
    </div>
  );
}

export function InsyteLogoWithName({className}: {className?: string}) {
  return (
    <div className={className} style={{ position: "relative" }}>
      <Image
        src="/assets/logo-with-name-transparent.png"
        alt="Logo"
        width={500}
        height={500}
      />
    </div>
  );
}

interface SVGLogoProps {
  gradientStart?: string;
  gradientEnd?: string;
  className?: string;
}

export function SVGLogo({gradientStart = "#006666", gradientEnd = "#00cccc", className = ''}: SVGLogoProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pupilRef = useRef<SVGCircleElement>(null);

  const scleraCenterX = 152.36;
  const scleraCenterY = 88.52;
  const scleraRadius = 42.58;
  const pupilRadius = 29.06;

  const maxPupilOffset = scleraRadius - pupilRadius - 5;

  useEffect(() => {
    const svgElement = svgRef.current;
    const pupilElement = pupilRef.current;

    if (!svgElement || !pupilElement) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const svgRect = svgElement.getBoundingClientRect();
      const viewBox = svgElement.viewBox.baseVal;

      // Prevent errors if SVG is not rendered or has no size
      if (!viewBox || svgRect.width === 0 || svgRect.height === 0) {
        return;
      }

      // Convert mouse screen coordinates to SVG internal coordinates
      const mouseXInSVG = (event.clientX - svgRect.left) * (viewBox.width / svgRect.width) + viewBox.x;
      const mouseYInSVG = (event.clientY - svgRect.top) * (viewBox.height / svgRect.height) + viewBox.y;

      // Calculate vector from sclera center to the mouse position (in SVG coordinates)
      const deltaX = mouseXInSVG - scleraCenterX;
      const deltaY = mouseYInSVG - scleraCenterY;

      // Calculate distance from sclera center to mouse
      const distanceToMouse = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      let newPupilCX;
      let newPupilCY;

      if (distanceToMouse <= maxPupilOffset) {
        // Mouse is within the allowed movement radius for the pupil's center
        newPupilCX = mouseXInSVG;
        newPupilCY = mouseYInSVG;
      } else {
        // Mouse is outside the allowed radius; clamp pupil's center to the edge
        const ratio = maxPupilOffset / distanceToMouse;
        newPupilCX = scleraCenterX + deltaX * ratio;
        newPupilCY = scleraCenterY + deltaY * ratio;
      }

      // Update pupil's position attributes
      pupilElement.setAttribute('cx', newPupilCX.toString());
      pupilElement.setAttribute('cy', newPupilCY.toString());
    };

    // Add event listener to the window to track mouse movement globally
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup: remove event listener when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [maxPupilOffset]);

  return (
  <svg
      ref={svgRef}
      viewBox="0 0 305.68 241.97"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={className}
    >

      <defs>
        <linearGradient id="pupilGradient" x1="123.36" y1="88.42" x2="181.49" y2="88.42" gradientUnits="userSpaceOnUse">
          <stop offset=".31" stopColor={gradientStart} />
          <stop offset="1" stopColor={gradientEnd} />
        </linearGradient>
      </defs>

      <circle
        ref={pupilRef}
        id="pupil" cx="152.43" cy="88.42" r="22.06"
        fill="#0E7270" />
      <path
        id="theRest"
        d="M305.68,88.57c-26.54-35.32-62.76-67.9-105.8-80.97-60.34-18.32-112.23-2.54-159.19,36.98C25.51,57.35,12.41,72.26,0,87.67c-.1,1.21,6.69,9.51,8.06,11.24,14.02,17.68,30.89,35.37,50,47.5,16.44,10.44,39.2,19.49,57.52,26.02l-.09,21.89c-5.2,2.76-8.76,8.33-8.76,14.77,0,9.18,7.23,16.63,16.14,16.63s16.14-7.44,16.14-16.63c0-6.52-3.65-12.15-8.96-14.87v-35.01c-24.62-6.53-49.66-15.93-70.2-31.1-15.54-11.48-27.98-25.12-40.53-39.69,15.37-18.98,34.6-37.4,55.53-50.19,39.95-24.41,94.7-29.68,137.47-9.35,28.64,13.61,54.93,34.86,73.91,60.18-12.78,13.23-24.81,27.4-39.75,38.3-17,12.42-36.78,22.17-56.95,28.17v-19.93c48.39-39.75,11.24-118.7-51.01-104.96-46.69,10.3-61.25,71.26-25.13,102.36,8.95,7.71,21.08,12.97,32.81,14.34l-.02,36.9,15.64,15.19v10.69c-5.64,2.59-9.58,8.41-9.58,15.18,0,9.18,7.23,16.63,16.14,16.63s16.14-7.44,16.14-16.63c0-6.82-3.99-12.68-9.7-15.24v-16.82l-14.39-15-.04-31.32s7.74-.22,15-3.57l.04,26.65,18.18,20.14c-.75,1.92-1.18,4.02-1.18,6.22,0,9.18,7.23,16.63,16.14,16.63s16.14-7.44,16.14-16.63-7.23-16.63-16.14-16.63c-1.72,0-3.89.74-5.44,1.25l-8.6-10.22c44.37-14.2,83.34-45.43,111.14-82.23ZM123.06,203.38c3.14,0,5.69,2.55,5.69,5.69s-2.55,5.69-5.69,5.69-5.69-2.55-5.69-5.69,2.55-5.69,5.69-5.69ZM168.78,219.61c3.14,0,5.69,2.55,5.69,5.69s-2.55,5.69-5.69,5.69-5.69-2.55-5.69-5.69,2.55-5.69,5.69-5.69ZM152.36,131.1c-23.52,0-42.58-19.07-42.58-42.58s19.07-42.58,42.58-42.58,42.58,19.07,42.58,42.58-19.07,42.58-42.58,42.58ZM208.96,190.69c3.14,0,5.69,2.55,5.69,5.69s-2.55,5.69-5.69,5.69-5.69-2.55-5.69-5.69,2.55-5.69,5.69-5.69Z"
        fill="#0e7270"
      />
    </svg>
  )
}

export function SVGName({className, fill = '#e0eee8'}: {className?: string; fill?: string;}) {
  return (
    <svg
      id="a"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 763.5 256.39"
      className={className}
    >
      <g id="container" fill={fill}>
        <g id="insyte">
          <rect    id="insyte_i" x="-56.95" y="59.68" width="143.27" height="29.27" transform="translate(-59.64 88.95) rotate(-89.96)"/>
          <path    id="insyte_n" d="M98.62,2.69l70.5,95.98c2.02-1.23.37-1.96.37-2.61V3.81l1.12-1.12h25.5l1.12,1.12v142.12h-26.25L100.5,49.19v96.75h-27.75V3.81l1.12-1.12h24.75Z"/>
          <path    id="insyte_s" d="M273.27,49.67c15,17.61,67.87,12.13,71.01,50.12,4.91,59.42-85.4,62.37-110.25,21.76l19.12-15.36c9.23,10.04,17.84,17.71,32.21,18.77,13.74,1.02,35.79-5.02,28.56-23.31-8.64-21.87-71.79-11.7-73.9-56.61-1.19-25.25,17.26-42.4,41.63-44.59,24.9-2.24,49.82,3.32,60.75,27.75l-19.4,11.86c-8.77-13.43-23.69-18.37-39.35-15.12-11.31,2.35-18.62,15.03-10.37,24.72Z"/>
          <polygon id="insyte_y" points="467.25 2.69 498 2.69 446.25 87.81 446.25 145.94 417 145.94 417 89.31 363.75 2.69 393.38 2.69 430.95 64.91 467.25 2.69"/>
          <path    id="insyte_t" d="M633.75,3.44v22.88l-1.12,1.12h-39.75l-1.5,118.5h-27.75l-.95-1.12c-.06-.27.57-.56.57-.75V27.49l-46.81-.05,12.95-24.75h102.49l1.88.75Z"/>
          <polygon id="insyte_e" points="753 62.69 753 85.94 694.5 85.94 695.62 121.94 763.5 121.94 763.5 145.94 665.25 145.94 665.25 2.67 762.75 2.67 762.79 27.44 695.62 27.44 695.62 62.69 753 62.69"/>
        </g>
        <g id="solutions">
          <path    id="solutions_s1" d="M96.14,202.79c-4.47-9.97-26.98-6.53-19.69,5.82,10.15,7.31,28.78,6.37,29.32,22.5.78,23.48-32.52,24.1-43.43,8.8l6.29-6.96c4.14,9.24,28.03,11.45,27.45-.38-.5-10.13-29.46-8.43-31.59-24.74-2.92-22.43,30.9-26.04,39.67-9.62l-8.02,4.58Z"/>
          <path    id="solutions_o1" d="M164.64,190.11c-16.8,0-30.41,13.62-30.41,30.41s13.62,30.41,30.41,30.41,30.41-13.62,30.41-30.41-13.62-30.41-30.41-30.41ZM164.64,241.36c-11.51,0-20.84-9.33-20.84-20.84s9.33-20.84,20.84-20.84,20.84,9.33,20.84,20.84-9.33,20.84-20.84,20.84Z"/>
          <polygon id="solutions_l" points="233.25 188.69 233.25 239.69 263.25 239.69 263.25 248.69 223.5 248.69 223.5 188.69 233.25 188.69"/>
          <path    id="solutions_u" d="M301.73,188.69l-.06,39.46c0,12.19,18.59,16.16,26.07,8.16.69-.74,2.54-2.79,3.01-5.24v-42.38h10.5v43.88c0,9.15-9.83,17.94-24.75,17.94-16.54,0-24.24-8.33-24.75-16.44v-45.38h9.98Z"/>
          <polygon id="solutions_t" points="421.23 188.69 416.62 198.44 397.5 198.43 397.5 248.69 387.75 248.69 387.75 198.44 364.59 198.44 369 188.69 421.23 188.69"/>
          <polygon id="solutions_i" points="445.5 188.65 456 188.65 456 256.39 445.5 248.69 445.5 188.65"/>
          <path    id="solutions_o2" d="M516.75,190.11c-16.8,0-30.41,13.62-30.41,30.41s13.62,30.41,30.41,30.41,30.41-13.62,30.41-30.41-13.62-30.41-30.41-30.41ZM516.75,241.36c-11.51,0-20.84-9.33-20.84-20.84s9.33-20.84,20.84-20.84,20.84,9.33,20.84,20.84-9.33,20.84-20.84,20.84Z"/>
          <path    id="solutions_n" d="M577.5,188.69l8.24.39,30.9,40.69,2.11.17c.37-.26-.75-.96-.75-1.12v-40.12h10.5v60l-10.12-.76-30.38-38.99v39.75h-10.5v-60Z"/>
          <path    id="solutions_s2" d="M691.97,202.33c-4.47-9.97-26.98-6.53-19.69,5.82,10.15,7.31,28.78,6.37,29.32,22.5.78,23.48-32.52,24.1-43.43,8.8l6.29-6.96c4.14,9.24,28.03,11.45,27.45-.38-.5-10.13-29.46-8.43-31.59-24.74-2.92-22.43,30.9-26.04,39.67-9.62l-8.02,4.58Z"/>
        </g>
      </g>
    </svg>
  )
}
