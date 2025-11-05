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
import { Settings } from "lucide-react";

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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Complete Your Profile</DialogTitle>
          <DialogDescription className="text-base pt-2">
            You need to complete your profile to access other features on the platform.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              Please add your name and bio to continue exploring NetworkNode.
            </p>
          </div>
          <Button
            onClick={handleCompleteProfile}
            className="w-full cursor-pointer"
          >
            <Settings className="mr-2 h-4 w-4" />
            Complete Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

