"use client";

import { useState } from "react";

export function useHomeState() {
  const [activeCalc, setActiveCalc] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => setEditMode((prev) => !prev);

  return {
    activeCalc,
    setActiveCalc,
    editMode,
    toggleEditMode,
  };
}
