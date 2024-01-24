"use client";

import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Smile } from "lucide-react";
import { cn } from "@/lib/utils";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useMediaQuery } from "usehooks-ts";
import { getAllCategories } from "@/action/emoji";
import { EmojiCategories } from "@prisma/client";

interface EmojiInputProps {
  onChange: (value: string) => void;
  value: string;
  isFollowersOnly: boolean;
  isDelayed: boolean;
  setValue: Dispatch<SetStateAction<string>>;
  disabled: boolean;
}

export const EmojiInput = ({
  onChange,
  value,
  isFollowersOnly,
  isDelayed,
  setValue,
  disabled,
}: EmojiInputProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const [custom, setCustom] = useState<EmojiCategories[]>();
  const ref = useRef<HTMLInputElement>(null);

  const mobileEmoji = useMediaQuery("(max-width: 1024px)");

  const addEmoji = (event: any) => {
    if (ref.current) {
      const cursor = ref.current.selectionStart || 0;
      const emoji = value.slice(0, cursor) + event.native + value.slice(cursor);
      setValue(emoji);

      //Codes added for the new cursor
      const newCursor = cursor + event.native.length;
      setTimeout(() => {
        if (ref.current) {
          ref.current.setSelectionRange(newCursor, newCursor);
        }
      }, 10);
      ref.current.focus();
    }
  };

  const openEmojiPicker = () => {
    setShowPicker((val) => !val);
    if (ref.current) {
      ref.current.focus();
    }
  };
  const getCategory = async () => {
    const x = await getAllCategories();
    setCustom(x);
  };
  useEffect(() => {
    getCategory();
  }, []);
  return (
    <div className="relative select-none">
      {showPicker && !mobileEmoji && (
        <div className="p-2 lg:absolute lg:block hidden right-0 bottom-14">
          <Picker
            data={data}
            onEmojiSelect={addEmoji}
            perLine={9}
            onClickOutside={() => setShowPicker(false)}
            custom={custom}
          />
        </div>
      )}
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          ref={ref}
          disabled={disabled}
          placeholder="Send a message"
          className={cn(
            "border-white/10",
            (isFollowersOnly || isDelayed) && "rounded-t-none border-t-0"
          )}
        />
        <Smile onClick={openEmojiPicker} className="w-5 h-5 inline-block" />
      </div>
      {showPicker && mobileEmoji && (
        <div className="p-2 absolute lg:hidden left-0 bottom-14">
          <Picker
            data={data}
            onEmojiSelect={addEmoji}
            perLine={6}
            onClickOutside={() => setShowPicker(false)}
            custom={custom}
          />
        </div>
      )}
    </div>
  );
};
