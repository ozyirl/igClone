import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";
import Comments from "./Comments";
import { Input } from "~/components/ui/input";
import {
  MessageCircle,
  MessageCirclePlus,
  CircleFadingPlus,
} from "lucide-react";
import { useState } from "react";
interface CommentDrawerProps {
  userId: string | null;
  imageId: number;
}

const CommentDrawer = ({ userId, imageId }: CommentDrawerProps) => {
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const handleCommentPost = async () => {
    setLoading(true);
    console.log("comment btn pressed");

    try {
      console.log("sending post request");

      const response = await fetch("/api/postComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, imageId, content: comment }),
      });
      if (!response.ok) {
        throw new Error("Failed to update like status");
      }

      const result = await response.json();
      console.log("API response:", result);
    } catch (error) {
      console.error("failed to post a comment", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <Drawer>
      <DrawerTrigger>
        {" "}
        <MessageCircle stroke="white" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-white">Comments</DrawerTitle>
          <DrawerDescription>please be disrespectful 🥰</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <Comments userId={userId} imageId={imageId} />
        </div>
        <div className="px-4">
          <Input
            placeholder="add a comment for {user.userId}"
            className="px-4 text-white "
            value={comment}
            onChange={handleCommentChange}
          ></Input>
        </div>
        <DrawerFooter className="w-42">
          <Button
            onClick={handleCommentPost}
            className="w-42 mb-4"
            disabled={loading}
          >
            {loading ? <CircleFadingPlus /> : <MessageCirclePlus />}
          </Button>
          <DrawerClose>
            <Button className="text-white" variant="secondary">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CommentDrawer;
