"use client";

import { useState } from "react";
import { toggleFollow } from "@/actions/user.actions";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import toast from "react-hot-toast";

function FollowButton({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleFollow = async () => {
    setIsLoading(true);
    try {
      await toggleFollow(userId);
      toast.success("Usuario seguido correctamente");
    } catch (error) {
      toast.error("Error siguiendo al usuario");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size={"sm"}
      variant={"secondary"}
      onClick={handleFollow}
      disabled={isLoading}
      className="w-20"
    >
      {isLoading ? <Loader2Icon className="size-4 animate-spin" /> : "Seguir"}
    </Button>
  );
}
export default FollowButton;
