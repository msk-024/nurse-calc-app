"use client";

import { useHomeState } from "@/app/_components/Home/useHomeState";
import { onboardingSteps } from "@/app/_components/Home/OnboardingSteps";
import HomePageLayout from "@/app/_components/Home/HomePageLayout";
import OnboardingGuide from "@/app/_components/onboarding/OnboardingGuide";

export default function HomePage() {
  const { activeCalc, setActiveCalc, editMode, toggleEditMode } =
    useHomeState();

  return (
    <>
      {/* 初回オンボーディング */}
      <OnboardingGuide storageKey="onboarding:home" steps={onboardingSteps} />

      {/* メインページ構造 */}
      <HomePageLayout
        activeCalc={activeCalc}
        setActiveCalc={setActiveCalc}
        editMode={editMode}
        toggleEditMode={toggleEditMode}
      />
    </>
  );
}
