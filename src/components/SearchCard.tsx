import { motion } from "motion/react";
import { ServiceSelector } from "./ServiceSelector";
import { DatingForm } from "./forms/DatingForm";
import { FollowingForm } from "./forms/FollowingForm";
import { FaceTraceForm } from "./forms/FaceTraceForm";
import { FidelityForm } from "./forms/FidelityForm";
import { useService } from "../lib/ServiceContext";

export function SearchCard() {
  const { selectedService, setSelectedService } = useService();

  const renderForm = () => {
    switch (selectedService) {
      case "dating":
        return <DatingForm />;
      case "following":
        return <FollowingForm />;
      case "facetrace":
        return <FaceTraceForm />;
      case "fidelity":
        return <FidelityForm />;
      default:
        return <DatingForm />;
    }
  };

  return (
    <>
      {/* Service Selector */}
      <ServiceSelector 
        selected={selectedService} 
        onSelect={setSelectedService}
      />

      {/* Form Container */}
      <div className="max-w-[1760px] mx-auto px-4 md:px-8 relative z-10 mb-12 md:mb-16">
        <motion.div 
          key={selectedService}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          {renderForm()}
        </motion.div>
      </div>
    </>
  );
}