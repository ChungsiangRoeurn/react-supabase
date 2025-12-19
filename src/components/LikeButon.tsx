import { useMutation } from "@tanstack/react-query";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { supabase } from "../supabase-client";
import { useAuth } from "../context/AuthContext";

interface Props {
  postId: number;
}

const vote = async (voteValue: number, postId: number, userId: string) => {
  const { error } = await supabase
    .from("votes")
    .insert({ post_id: postId, user_id: userId, vote: voteValue });
  if (error) throw new Error(error.message);
};

export const LikeButton = ({ postId }: Props) => {
  const { user } = useAuth();

  const { mutate } = useMutation({
    mutationFn: (voteValue: number) => {
      if (!user) throw new Error("You must be logged in to Vote!");
      return vote(voteValue, postId, user!.id);
    },
  });

  return (
    <div className="flex items-center space-x-4 my-4">
      <button
        onClick={() => mutate(1)}
        className="flex items-center justify-center size-10 cursor-pointer rounded-full bg-blue-50 hover:bg-blue-200 transition-colors shadow-md"
      >
        <ThumbsUp className="text-blue-600 w-6 h-6" />
      </button>
      <button
        onClick={() => mutate(-1)}
        className="flex items-center justify-center size-10 cursor-pointer rounded-full bg-red-50 hover:bg-red-200 transition-colors shadow-md"
      >
        <ThumbsDown className="text-red-600 w-6 h-6" />
      </button>
    </div>
  );
};
