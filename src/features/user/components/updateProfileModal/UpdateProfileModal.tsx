import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/features/auth/context/authContext";
import { updateUserSchema } from "@/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import { z } from "zod";
import { formatDate } from "@/shared/utils/formatDate";

export function UpdateProfileModal() {
  const { user } = useAuth();
  const { mutate, isPending } = useUpdateProfile();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name ?? "",
      username: user?.username ?? "",
      email: user?.email ?? "",
      dob: formatDate(user?.dob),
    },
    resolver: zodResolver(updateUserSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name ?? "",
        username: user.username ?? "",
        email: user?.email ?? "",
        dob: formatDate(user?.dob),
      });
    }
  }, [user, reset, open]);

  function onSubmit(data: z.infer<typeof updateUserSchema>) {
    const payload = {
      ...data,
      dob: data.dob ? data.dob.toISOString() : null,
    };

    mutate(payload, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant={"secondary"}>Edit profile</Button>}
      />
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                {...register("name")}
                className={errors.name ? "inputError" : undefined}
              />
              {errors.name?.message && (
                <p className="errorText">{errors.name.message as string}</p>
              )}
            </Field>

            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input
                id="username-1"
                {...register("username")}
                className={errors.username ? "inputError" : undefined}
              />
              {errors.username?.message && (
                <p className="errorText">{errors.username.message as string}</p>
              )}
            </Field>
            <Field>
              <Label htmlFor="email-1">Email</Label>
              <Input
                id="email-1"
                {...register("email")}
                className={errors.email ? "inputError" : undefined}
              />
              {errors.email?.message && (
                <p className="errorText">{errors.email.message as string}</p>
              )}
            </Field>
            <Field>
              <Label htmlFor="dob-1">Date of birth</Label>
              <Input
                id="dob-1"
                type="date"
                {...register("dob")}
                className={errors.dob ? "inputError" : undefined}
              />
              {errors.dob?.message && (
                <p className="errorText">{errors.dob.message as string}</p>
              )}
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
