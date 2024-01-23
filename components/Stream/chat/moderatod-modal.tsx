"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/lib/uploadthing";
import { Hint } from "@/components/hint";
import Image from "next/image";
import { Dispatch, RefObject, SetStateAction } from "react";

interface ModeratorModalProps {
  openModal: RefObject<HTMLButtonElement>;
  closeModal: RefObject<HTMLButtonElement>;
  onSubmit: () => void;
  participantName?: string;
  confirmMod: string;
  setConfirmMod: Dispatch<SetStateAction<string>>;
  isPending: boolean;
}
//! DELETE AFTERWARDS this file is of no use
export const ModeratorModal = ({
  openModal,
  closeModal,
  onSubmit,
  participantName,
  confirmMod,
  setConfirmMod,
  isPending,
}: ModeratorModalProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmMod(e.target.value);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button ref={openModal} asChild></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>
        <form className="space-y-14" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label>
              Write following sentence in the below input{" "}
              <span className="font-bold select-none">
                make {participantName} moderator
              </span>
              to confirm
            </Label>
            <Input
              value={confirmMod}
              placeholder="Stream name"
              disabled={isPending}
              onChange={onChange}
            />
          </div>

          <div className="flex justify-between">
            <DialogClose asChild ref={closeModal}>
              <Button type="button" variant="ghost">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" variant="primary" disabled={isPending}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// "use client";

// import { cn, stringToColor } from "@/lib/utils";
// import { onBlock, onModBlock } from "@/action/block";
// import { Hint } from "@/components/hint";
// import { Button } from "@/components/ui/button";
// import { MinusCircle, Sparkle, Sparkles } from "lucide-react";
// import { ElementRef, useRef, useState, useTransition } from "react";
// import { toast } from "sonner";
// import { addModerator } from "@/action/moderator";
// import { ModeratorModal } from "./moderatod-modal";
// import {
//   Dialog,
//   DialogClose,
//   DialogTitle,
//   DialogHeader,
//   DialogTrigger,
//   DialogContent,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// interface CommunityItemProps {
//   hostName: string;
//   viewerName: string;
//   participantName?: string;
//   participantIdentity: string;
//   moderator?: boolean;
// }

// export const CommunityItem = ({
//   hostName,
//   viewerName,
//   participantName,
//   participantIdentity,
//   moderator,
// }: CommunityItemProps) => {
//   const [isPending, startTransition] = useTransition();
//   const [confirmMod, setConfirmMod] = useState("");
//   const openModeratorModalRef = useRef<ElementRef<"button">>(null);
//   const closeModeratorModalRef = useRef<ElementRef<"button">>(null);

//   const color = stringToColor(participantName || "");

//   const isSelf = participantName === viewerName;
//   const isHost = viewerName === hostName;

//   const handleBlock = () => {
//     // if (!participantName || isSelf || !isHost) return;

//     if (moderator) {
//       startTransition(() => {
//         onModBlock(participantIdentity, hostName)
//           .then(() => toast.success(`Blocked ${participantName}`))
//           .catch(() => toast.error("Something went wrong"));
//       });
//     } else {
//       startTransition(() => {
//         onBlock(participantIdentity)
//           .then(() => toast.success(`Blocked ${participantName}`))
//           .catch(() => toast.error("Something went wrong"));
//       });
//     }
//   };

//   const newModerator = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (confirmMod === `make ${participantName} moderator`) {
//       if (!moderator) {
//         startTransition(() => {
//           if (participantName) {
//             addModerator({
//               userId: participantIdentity,
//               username: participantName,
//             })
//               .then(() =>
//                 toast.success(`Assigned ${participantName} moderator`)
//               )
//               .catch(() => toast.error("Something went wrong"));
//           }
//         });
//       }
//     } else {
//       toast.error(`Entered prompt was wrong`);
//     }
//   };

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setConfirmMod(e.target.value);
//   };
//   return (
//     <div
//       className={cn(
//         "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",
//         isPending && "opacity-50 pointer-events-none"
//       )}
//     >
//       <p
//         style={{ color: moderator ? "#bd3535" : color }}
//         className={moderator ? "font-bold" : ""}
//       >
//         {participantName}
//         {moderator ? (
//           <Sparkles className="w-3 h-3 text-red-500 inline-block" />
//         ) : null}
//       </p>
//       <div className="">
//         {isHost && !moderator && (
//           <Hint label="Promote to moderator">
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button
//                   variant="ghost"
//                   disabled={isPending}
//                   className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
//                 >
//                   <Sparkle className="h-4 w-4 text-muted-foreground" />
//                 </Button>
//               </DialogTrigger>
//               <DialogContent>
//                 <DialogHeader>
//                   <DialogTitle>Edit stream info</DialogTitle>
//                 </DialogHeader>
//                 <form className="space-y-14" onSubmit={newModerator}>
//                   <div className="space-y-2">
//                     <Label>
//                       Write following sentence in the below input{" "}
//                       <span className="font-bold select-none">
//                         make {participantName} moderator
//                       </span>
//                       to confirm
//                     </Label>
//                     <Input
//                       value={confirmMod}
//                       placeholder="Stream name"
//                       disabled={isPending}
//                       onChange={onChange}
//                     />
//                   </div>

//                   <div className="flex justify-between">
//                     <DialogClose asChild ref={closeModeratorModalRef}>
//                       <Button type="button" variant="ghost">
//                         Close
//                       </Button>
//                     </DialogClose>
//                     <Button
//                       type="submit"
//                       variant="primary"
//                       disabled={isPending}
//                     >
//                       Save
//                     </Button>
//                   </div>
//                 </form>
//               </DialogContent>
//             </Dialog>
//           </Hint>
//         )}

//         {!isSelf && (isHost || moderator) && (
//           <Hint label="Block">
//             <Button
//               variant="ghost"
//               disabled={isPending}
//               onClick={handleBlock}
//               className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition"
//             >
//               <MinusCircle className="h-4 w-4 text-muted-foreground" />
//             </Button>
//           </Hint>
//         )}
//       </div>
//     </div>
//   );
// };
