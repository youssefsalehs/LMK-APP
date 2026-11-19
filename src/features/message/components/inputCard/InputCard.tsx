import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/context/authContext";
import type { User } from "@/types/userModel";
import { useState, type ChangeEvent } from "react";
import useSendMsg from "../../hooks/useSendMsg";
import styles from "./InputCard.module.css";
import useSendAnonymousMsg from "../../hooks/useSendAnonymousMsg";
const DEFAULT_PP: string = import.meta.env.VITE_DEFAULT_PP;
import type { KeyboardEvent } from "react";
export default function InputCard({ userData }: { userData: Partial<User> }) {
  const { user } = useAuth();
  const [content, setContent] = useState<string>("");
  const { mutate, isPending } = useSendMsg();
  const { mutate: sendAnonymous, isPending: isSendingAnonymous } =
    useSendAnonymousMsg();
  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  function handleSend() {
    if (user?._id && userData?._id && content.trim()) {
      return mutate(
        { content, sender: user?._id, receiver: userData?._id },
        {
          onSuccess: () => {
            setContent("");
          },
        },
      );
    }
    sendAnonymous(
      { content, receiver: userData._id },
      {
        onSuccess: () => {
          setContent("");
        },
      },
    );
  }
  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="h-12 w-12 rounded-full overflow-hidden">
          <img
            src={
              userData?.profilePicture
                ? userData.profilePicture.secure_url
                : DEFAULT_PP
            }
            className="object-center"
            alt="User avatar"
          />
        </div>
        <div>
          <p className="">@{userData?.username ?? "user"}</p>
          <p>send anonymous msg!</p>
        </div>
      </div>
      <div className={styles.content}>
        <textarea
          placeholder="write your msg"
          value={content}
          rows={5}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={styles.input}
        />
        <div className="absolute bottom-0 flex gap-2 right-0 m-4">
          <Button
            onClick={handleSend}
            type="submit"
            disabled={isPending || isSendingAnonymous || !content.trim()}
          >
            {isPending ? "sending..." : "send"}
          </Button>
        </div>
      </div>
    </div>
  );
}
