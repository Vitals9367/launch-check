"use client";

import { type ReactNode, useState } from "react";

interface SelectableItemProps {
  children: ReactNode;
  onSelect?: (e: React.MouseEvent) => void;
  isSelected?: boolean;
  longPressDelay?: number;
  className?: string;
}

export function SelectableItem({
  children,
  onSelect,
  isSelected = false,
  longPressDelay = 500,
  className,
}: SelectableItemProps) {
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(
    null,
  );
  const [isSelecting, setIsSelecting] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!onSelect) return;

    const timer = setTimeout(() => {
      setIsSelecting(true);
      onSelect(e);
    }, longPressDelay);

    setLongPressTimer(timer);
  };

  const handleMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleMouseLeave = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    setIsSelecting(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isSelecting) {
      e.preventDefault();
      e.stopPropagation();
      setIsSelecting(false);
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={(e) => handleMouseDown(e as unknown as React.MouseEvent)}
      onTouchEnd={handleMouseUp}
      onClick={handleClick}
      className={className}
    >
      {children}
    </div>
  );
}
