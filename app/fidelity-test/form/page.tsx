"use client";

import { FidelityForm } from '@/components/forms/FidelityForm';
import { ServiceLayout } from '@/components/layouts/ServiceLayout';

export default function FidelityTestFormPage() {
  return (
    <ServiceLayout variant="fidelity">
      <div className="mx-auto flex min-h-[calc(100vh-120px)] w-full max-w-2xl items-center px-4 py-10">
        <FidelityForm />
      </div>
    </ServiceLayout>
  );
}
