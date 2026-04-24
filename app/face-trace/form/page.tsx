"use client";

import { FaceTraceForm } from '@/components/forms/FaceTraceForm';
import { ServiceLayout } from '@/components/layouts/ServiceLayout';

export default function FaceTraceFormPage() {
  return (
    <ServiceLayout variant="faceTrace">
      <div className="mx-auto flex min-h-[calc(100vh-120px)] w-full max-w-2xl items-center px-4 py-10">
        <FaceTraceForm />
      </div>
    </ServiceLayout>
  );
}
