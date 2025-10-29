import { CheckCircle2 } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function ProgressBar({
  currentStep,
  totalSteps,
  steps,
}: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-1 flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all ${
                index < currentStep
                  ? "text-primary-foreground border-green-500 bg-green-500"
                  : index === currentStep
                    ? "text-primary-foreground ring-primary border-blue-500 bg-blue-500 ring-2 ring-offset-2"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {index < currentStep ? <CheckCircle2 /> : index + 1}
            </div>
            <p className="text-muted-foreground mt-2 max-w-20 text-center text-xs">
              {step}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
        <div
          className="h-full bg-green-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
