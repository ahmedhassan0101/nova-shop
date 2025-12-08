// src/app/[locale]/page.tsx
// import TestFormComponent from "@/components/form-fields/TestFormComponent";
import { OTPBanner } from "@/components/OTPBanner";
import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      {/* <OTPBanner/> */}
      {/* Add more sections here */}
      {/* <TestFormComponent /> */}
    </div>
  );
}
