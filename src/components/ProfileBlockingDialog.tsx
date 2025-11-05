"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ProfileBlockingDialogProps {
  open: boolean;
  onClose?: () => void;
}

export function ProfileBlockingDialog({ open, onClose }: ProfileBlockingDialogProps) {
  const router = useRouter();

  const handleCompleteProfile = () => {
    if (onClose) {
      onClose();
    }
    router.push("/dashboard/profile");
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md w-[95vw]">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-bold text-center">Complete Your Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm sm:text-base text-gray-700 text-center">
            Please add your name and bio.
          </p>
          <Button
            onClick={handleCompleteProfile}
            className="w-full cursor-pointer h-10 sm:h-11"
          >
            Go to Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

