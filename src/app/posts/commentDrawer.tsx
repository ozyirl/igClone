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
import { MessageCircle, MessageCirclePlus } from "lucide-react";
const CommentDrawer = () => {
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
        <div className="p-2">
          <Comments />
        </div>
        <div className="px-4">
          <Input
            placeholder="add a comment for {user.userId}"
            className="px-4 text-white "
          ></Input>
        </div>
        <DrawerFooter className="w-42">
          <Button className="w-42 mb-4">
            <MessageCirclePlus />
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
