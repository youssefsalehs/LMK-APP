import { useAuth } from "@/features/auth/context/authContext";
import { formatDate } from "@/shared/utils/formatDate";
import {
  Calendar,
  CalendarIcon,
  Check,
  Copy,
  Mail,
  PencilIcon,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";
import InfoCard from "../../components/infoCard/InfoCard";
import { UpdateProfileModal } from "../../components/updateProfileModal/UpdateProfileModal";
import useUploadCoverPicture from "../../hooks/useUploadCoverPicture";
import useUploadProfilePicture from "../../hooks/useUploadProfilePicture";

const DEFAULT_PP: string = import.meta.env.VITE_DEFAULT_PP;
const DEFAULT_COVER: string = import.meta.env.VITE_DEFAULT_COVER;
const BACKENDURL: string = import.meta.env.VITE_API_URL;
interface ChangePhotoHandler {
  (
    e: React.ChangeEvent<HTMLInputElement>,
    filename: string,
    mutateFn: (formData: FormData) => void,
  ): void;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const { mutate: mutateProfilePic } = useUploadProfilePicture();
  const { mutate: mutateCoverPic } = useUploadCoverPicture();
  const [copied, setCopied] = useState(false);
  const profilePicturePath = BACKENDURL + "/" + user?.profilePicture;
  const coverPicturePath = BACKENDURL + "/" + user?.coverPicture;
  console.log(profilePicturePath, coverPicturePath);
  console.log(user?.profilePicture);
  const profileUrl = `${window.location.origin}/${user?.username || ""}`;

  const handleCopyLink = () => {
    if (!user?.username) return;
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChangePhoto: ChangePhotoHandler = (e, filename, mutateFn) => {
    const file: File | undefined = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append(filename, file);
    mutateFn(formData);
  };

  return (
    <div className="w-full space-y-8">
      <div className="relative h-48 sm:h-64 md:h-72 w-full bg-muted rounded-3xl group overflow-hidden shadow-xs">
        <img
          src={user?.coverPicture ? coverPicturePath : DEFAULT_COVER}
          alt={user?.name ? `${user.name}'s cover photo` : "Cover photo"}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-4 right-4 z-20">
          <label
            htmlFor="cover-upload"
            className="flex items-center gap-2 px-3.5 py-2 bg-background/80 backdrop-blur-md border border-border shadow-md rounded-2xl cursor-pointer hover:bg-background transition-colors text-xs font-semibold text-foreground"
            title="Change Cover Photo"
          >
            <PencilIcon className="w-4 h-4 text-primary" />
            <span className="hidden sm:inline">Edit Cover Photo</span>
            <input
              id="cover-upload"
              type="file"
              accept="image/*"
              name="coverPhoto"
              className="hidden"
              onChange={(e) =>
                handleChangePhoto(e, "coverPicture", mutateCoverPic)
              }
            />
          </label>
        </div>
      </div>

      <div className="space-y-8 relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-10 -mt-20 sm:-mt-24 px-2 sm:px-4">
          <div className="flex flex-col sm:flex-row sm:items-end gap-5 w-full">
            <div className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-3xl  bg-muted border-4 border-background shadow-xl shrink-0">
              <img
                src={user?.profilePicture ? profilePicturePath : DEFAULT_PP}
                alt={user?.name || "Profile picture"}
                className="w-full h-full object-cover rounded-2xl"
              />

              <div className="absolute -bottom-1 -right-1 z-20">
                <label
                  htmlFor="avatar-upload"
                  className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-background border border-border shadow-md rounded-full cursor-pointer hover:bg-accent transition-colors"
                  title="Change Profile Picture"
                >
                  <PencilIcon className="w-4 h-4 text-foreground" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    name="profilePicture"
                    className="hidden"
                    onChange={(e) =>
                      handleChangePhoto(e, "profilePicture", mutateProfilePic)
                    }
                  />
                </label>
              </div>
            </div>

            <div className="min-w-0 pt-1 sm:pb-2 text-primary-foreground">
              <h2 className="text-2xl sm:text-3xl tracking-tight ">
                {user?.name || "Anonymous User"}
              </h2>
              <p className=" font-mono text-primary-foreground/70 text-sm sm:text-base mt-0.5">
                @{user?.username || "username"}
              </p>
            </div>
            <div className="ml-auto">
              <UpdateProfileModal />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
          {user?.email && (
            <InfoCard
              title={"Email Address"}
              description={user.email}
              icon={<Mail className="icon" />}
            />
          )}

          <InfoCard
            title={"Security (2FA)"}
            description={
              user?.twoStepVerification
                ? "Enabled & Active"
                : "Disabled (Recommended)"
            }
            icon={<Shield className="icon" />}
          />
          <InfoCard
            title={"Gender"}
            description={user?.gender ?? "Not specified"}
            icon={<User className="icon" />}
          />

          {user?.dob && (
            <InfoCard
              title={"Date of Birth"}
              description={formatDate(user.dob)}
              icon={<Calendar className="icon" />}
            />
          )}

          {user?.createdAt && (
            <InfoCard
              title={"Member Since"}
              description={formatDate(user.createdAt)}
              icon={<CalendarIcon className="icon" />}
            />
          )}
        </div>

        <InfoCard
          title="Public Messaging Link"
          description={profileUrl}
          icon={
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-background border border-border hover:bg-accent rounded-xl text-foreground font-medium text-xs transition-colors cursor-pointer shrink-0 shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                </>
              )}
            </button>
          }
        />
      </div>
    </div>
  );
}
