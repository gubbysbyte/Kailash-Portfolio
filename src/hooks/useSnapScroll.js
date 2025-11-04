import { useState, useEffect, useRef } from "react";

export const useSnapScroll = (islandRef, isRotating, setIsRotating, setCurrentStage) => {
  const [isSnapping, setIsSnapping] = useState(false);
  const snapTimeoutRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // Define the rotation values for each stage. These are in radians.
  // You may need to adjust these values to match your island's orientation.
  const stageRotations = {
    1: 4.5, // Stage 1 (matches ~4.25-4.75)
    2: 2.5, // Stage 2 (matches ~2.4-2.6)
    3: 1.1, // Stage 3 (matches ~0.85-1.3)
    4: 5.65, // Stage 4 (matches ~5.45-5.85)
  };

  // Normalize any angle to [0, 2π)
  const normalize = (angle) => {
    const twoPi = Math.PI * 2;
    return ((angle % twoPi) + twoPi) % twoPi;
  };

  // Smallest signed angular delta from a to b in range (-π, π]
  const shortestDelta = (from, to) => {
    const twoPi = Math.PI * 2;
    let d = normalize(to) - normalize(from);
    if (d > Math.PI) d -= twoPi;
    if (d <= -Math.PI) d += twoPi;
    return d;
  };

  const getClosestStage = (rotation) => {
    let closestStage = 1;
    let minDiff = Infinity;

    for (const stage in stageRotations) {
      const diff = Math.abs(shortestDelta(rotation, stageRotations[stage]));
      if (diff < minDiff) {
        minDiff = diff;
        closestStage = parseInt(stage);
      }
    }
    return closestStage;
  };

  const snapToStage = (stage) => {
    if (!islandRef.current || isSnapping) return;

    setIsSnapping(true);
    setIsRotating(true);

    const targetRotation = stageRotations[stage];
    const ease = 0.15; // easing factor for smooth snap

    // Use an animation loop for smooth snapping using shortest angular path
    const animate = () => {
      if (!islandRef.current) return;
      const current = islandRef.current.rotation.y;
      const delta = shortestDelta(current, targetRotation);

      // If close enough, finish
      if (Math.abs(delta) < 0.005) {
        islandRef.current.rotation.y = normalize(targetRotation);
        setCurrentStage(stage);
        setIsRotating(false);
        setIsSnapping(false);
        return;
      }

      islandRef.current.rotation.y = normalize(current + delta * ease);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const handleWheel = (event) => {
      if (!islandRef.current || isSnapping) return;

      // Prevent default scroll behavior
      event.preventDefault();

      // Clear any pending snap
      clearTimeout(snapTimeoutRef.current);
      clearTimeout(scrollTimeoutRef.current);

      setIsRotating(true);

      // Adjust rotation based on scroll. The multiplier controls sensitivity.
      islandRef.current.rotation.y = normalize(
        islandRef.current.rotation.y + event.deltaY * 0.005
      );

      // After scrolling stops, snap to the nearest stage
      scrollTimeoutRef.current = setTimeout(() => {
        setIsRotating(false);
      }, 150);

      // Snap after a short delay of inactivity
      snapTimeoutRef.current = setTimeout(() => {
        if (!isSnapping && islandRef.current) {
          const closestStage = getClosestStage(islandRef.current.rotation.y);
          snapToStage(closestStage);
        }
      }, 300); // Adjust delay as needed
    };

    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("wheel", handleWheel);
      }
      clearTimeout(snapTimeoutRef.current);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [islandRef, isSnapping, setIsRotating, setCurrentStage]);
};
