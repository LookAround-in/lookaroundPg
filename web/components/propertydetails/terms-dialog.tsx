'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "components/ui/dialog";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { PgRequestData } from "@/interfaces/pg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const createPropertyRequest = async (pgRequest: PgRequestData) => {
  if (!pgRequest) {
    throw new Error("PG request data is required");
  }
  const response = await fetch("/api/v1/pgrequest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pgRequest),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create property request");
  }
  return response.json();
};

interface TermsDialogProps {
    property: {
        hostId: string;
        id: string;
    },
    showTermsDialog: boolean;
    setShowTermsDialog: React.Dispatch<React.SetStateAction<boolean>>;
    termsAccepted: boolean;
    setTermsAccepted: React.Dispatch<React.SetStateAction<boolean>>;
    setShowHostInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TermsDialog({
    property,
    showTermsDialog,
    setShowTermsDialog,
    termsAccepted,
    setTermsAccepted,
    setShowHostInfo,
}: TermsDialogProps) {
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const { toast } = useToast();
    const { mutate: createPropertyRequestMutation, isPending: pendingRequest } = useMutation({
      mutationFn: createPropertyRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["pgRequests"] });
        setShowHostInfo(true);
        setShowTermsDialog(false);
        toast({
          title: "Contact information revealed",
          description: "You can now contact the host directly.",
        });
      },
      onError: (error: Error) => {
        console.error("Error creating property request:", error);
        toast({
          title: "Error revealing contact information",
          description:
            "There was an error revealing the host's contact information. Try again later.",
          variant: "destructive",
        });
      },
    });
    const handleTermsAcceptance = () => {
      if (!termsAccepted) {
        toast({
          title: "Terms acceptance required",
          description: "Please accept the terms and conditions to proceed.",
          variant: "destructive",
        });
        return;
      }
  
      createPropertyRequestMutation({
        hostId: property.hostId,
        userId: user?.id,
        pgId: property.id,
      });
    };
    return (
        <>
        {/* Terms and Conditions Dialog */}
        <Dialog open={showTermsDialog} onOpenChange={setShowTermsDialog}>
          <DialogContent className="max-w-md rounded-lg">
            <DialogHeader>
              <DialogTitle>Terms and Conditions</DialogTitle>
              <DialogDescription>
                Please read and accept the terms before proceeding.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">Important Notice</h4>
                <p className="text-sm text-gray-600">
                  LookAroundPG is just a platform that connects users with
                  property hosts. LookAroundPG is not responsible for any
                  disputes, damages, or issues that may arise between users and
                  hosts. By proceeding, you acknowledge that any transactions or
                  agreements are directly between you and the property host.
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) =>
                    setTermsAccepted(checked === true)
                  }
                />
                <label htmlFor="terms" className="text-sm">
                  I agree to the terms and conditions
                </label>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowTermsDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleTermsAcceptance}
                disabled={!termsAccepted}
                className="mb-2 sm:mb-0"
              >
                {pendingRequest ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Accept & Continue"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </>
    )
}