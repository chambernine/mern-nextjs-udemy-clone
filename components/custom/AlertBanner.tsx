import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Rocket, TriangleAlert } from "lucide-react";

interface AlertBannerProps {
  isCompleted: boolean;
  requiredFieldsCount: number;
  missingFieldsCount: number;
}

function AlertBanner({
  isCompleted,
  requiredFieldsCount,
  missingFieldsCount,
}: AlertBannerProps) {
  return (
    <Alert className="my-4" variant={isCompleted ? "complete" : "destructive"}>
      {isCompleted ? (
        <Rocket className="h-4 w-4" />
      ) : (
        <TriangleAlert className="h-4 w-4" />
      )}
      <AlertTitle className="text-xs font-medium">
        {missingFieldsCount} missing field(s) / {requiredFieldsCount} required
        fields
      </AlertTitle>
      <AlertDescription className="text-xs">
        {isCompleted
          ? `Great job Ready to publish`
          : `You can only publish if all the required fields are filled out.`}
      </AlertDescription>
    </Alert>
  );
}

export default AlertBanner;
