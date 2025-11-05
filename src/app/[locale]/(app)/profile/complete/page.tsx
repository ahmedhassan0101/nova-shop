'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AddressStep from '@/components/profile/AddressStep';
import PreferencesStep from '@/components/profile/PreferencesStep';
// Cannot find module '@/components/profile/PreferencesStep' or its corresponding type declarations.

export default function ProfileCompletePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(2);

  useEffect(() => {
    if (session?.user?.isProfileComplete) {
      router.push('/');
    }
  }, [session, router]);

  const handleStepComplete = async (step: number) => {
    if (step === 3) {
      // Profile completed
      await update({ isProfileComplete: true });
      router.push('/');
    } else {
      setCurrentStep(step + 1);
    }
  };

  const progress = (currentStep / 3) * 100;

  return (
    <div className="container max-w-2xl py-10 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            Step {currentStep} of 3 - Let&apos;s set up your account
          </CardDescription>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
        <CardContent>
          {currentStep === 3 && (
            <AddressStep onComplete={() => handleStepComplete(2)} />
          )}
          {currentStep === 2 && (
            <PreferencesStep onComplete={() => handleStepComplete(3)} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}