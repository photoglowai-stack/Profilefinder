"use client";

import { FollowingForm } from '@/components/forms/FollowingForm';
import { ServiceLayout } from '@/components/layouts/ServiceLayout';

export default function FollowingAIFormPage() {
  return (
    <ServiceLayout variant="following">
      <div className="mx-auto flex min-h-[calc(100vh-120px)] w-full max-w-2xl items-center px-4 py-10">
        <FollowingForm />
      </div>
    </ServiceLayout>
  );
}
