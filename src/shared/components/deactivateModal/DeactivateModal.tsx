import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useLogout from "@/features/auth/hooks/useLogout";
import useDeactivateUser from "@/features/user/hooks/useDeactivateUser";
import { useState, type ReactNode } from "react";

export function DeactivateModal({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { mutate: logout } = useLogout();
  const { mutate: deactivate, isPending: isDeactivating } = useDeactivateUser();

  const handleConfirm = () => {
    logout();
    deactivate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={children as React.ReactElement} />

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action will deactivate your account. You can reactivate it
            later by logging back in.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 ">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeactivating}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={isDeactivating}
          >
            {isDeactivating ? "Deactivating..." : "Yes, deactivate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
