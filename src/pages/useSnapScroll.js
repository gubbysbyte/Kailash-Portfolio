import { useState, useEffect, useRef } from "react";

export const useSnapScroll = (islandRef, isRotating, setIsRotating, setCurrentStage) => {
  const [isSnapping, setIsSnapping] = useState(false);
  const snapTimeoutRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // Define the rotation values for each stage. These are in radians.
  // You may need to adjust these values to match your island's orientation.
  const stageRotations = {
    1: 5.8, // Initial position
    2: 4.3, // About
    3: 2.5, // Projects
    4: 0.7, // Contact
  };

  const getClosestStage = (rotation) => {
    let closestStage = 1;
    let minDiff = Infinity;

    for (const stage in stageRotations) {
      const diff = Math.abs(rotation - stageRotations[stage]);
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
    const currentRotation = islandRef.current.rotation.y;

    // Use an animation loop for smooth snapping
    const animate = () => {
      const newRotation = islandRef.current.rotation.y + (targetRotation - currentRotation) * 0.1;
      islandRef.current.rotation.y = newRotation;

      if (Math.abs(newRotation - targetRotation) > 0.01) {
        requestAnimationFrame(animate);
      } else {
        islandRef.current.rotation.y = targetRotation;
        setCurrentStage(stage);
        setIsRotating(false);
        setIsSnapping(false);
      }
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
      islandRef.current.rotation.y += event.deltaY * 0.005;

      // After scrolling stops, snap to the nearest stage
      scrollTimeoutRef.current = setTimeout(() => {
        setIsRotating(false);
      }, 150);

      // Snap after a short delay of inactivity
      snapTimeoutRef.current = setTimeout(() => {
        if (!isRotating) {
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
  }, [islandRef, isRotating, isSnapping, setIsRotating, setCurrentStage]);
};