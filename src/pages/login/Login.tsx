import { GalleryVerticalEnd } from "lucide-react";

import { LoginForm } from "@/components/features/login/login-form";
import ErrorBoundary from "@/components/common/ErrorBoundary";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Acme Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <ErrorBoundary>
              <LoginForm />
            </ErrorBoundary>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://res.cloudinary.com/dbswzktwo/image/upload/v1765266307/Gemini_Generated_Image_aql2qxaql2qxaql2_zuzh43.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-fill dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
