'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog";
import { Play } from "lucide-react";

interface VirtualTourProps {
  property: {
    title: string;
    virtualTourUrl: string;
  };
  showVirtualTourModal: boolean;
  setShowVirtualTourModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function VirtualTour({ property, showVirtualTourModal, setShowVirtualTourModal }: VirtualTourProps){
    return (
        <>
        <Dialog
          open={showVirtualTourModal}
          onOpenChange={setShowVirtualTourModal}
        >
          <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-hidden p-2">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="flex items-center gap-2 pt-2">
                <Play className="h-5 w-5" />
                Virtual Tour - {property.title}
              </DialogTitle>
            </DialogHeader>
            <div className="w-full h-full">
              <div
                className="relative w-full"
                style={{ paddingBottom: "56.25%" }}
              >
                <iframe
                  src={property.virtualTourUrl}
                  title="360 Virtual Tour"
                  className="absolute top-0 w-full h-full rounded-lg"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
        </>
    )
}