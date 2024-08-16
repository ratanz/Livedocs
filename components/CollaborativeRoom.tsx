"use client";

import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import Header from "./Header";
import { Editor } from "./editor/Editor";
import ActiveCollborators from "./ActiveCollborators";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { Input } from "./ui/input";

import Image from "next/image";
import { updateDocument } from "@/lib/actions/room.actions";
import Loader from "./Loader";

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
}: CollaborativeRoomProps) => {
  const  currentUserType  = "editor";

  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const conatinerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updataTitleHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setLoading(true);

      try {
        if(documentTitle !== roomMetadata.title) {
          const updatedDocument = await updateDocument(roomId, documentTitle);
          setDocumentTitle(updatedDocument.metadata.title);
        }

      } 
      catch (error) {
        console.log(error);
      }

      setLoading(false);

    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (conatinerRef.current && !conatinerRef.current.contains(e.target as Node)) {
        setEditing(false);
        updateDocument(roomId, documentTitle);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  },[roomId, documentTitle]);

  useEffect(() => {
    if(editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div
              ref={conatinerRef}
              className="flex w-full items-center justify-center gap-2"
            >
              {editing && !loading ? (
                <Input
                  type="text"
                  value={documentTitle}
                  ref={inputRef}
                  placeholder="Enter a title"
                  onChange={(e) => {
                    setDocumentTitle(e.target.value);
                  }}
                  onKeyDown={updataTitleHandler}
                  disabled={false}
                  className="document-title-input"

                />
              ) : (
                <>
                  <p className="document-title">
                    {documentTitle}
                  </p>
                </>
              )}

              {currentUserType === "editor"  && !editing &&  (
                <Image
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={24}
                  height={24}
                  onClick={() => {
                    setEditing(true);
                  }}
                  className="pointer"
                />
            )}

              {currentUserType !== "editor" && !editing && (
                <p className="view-only-tag">View Only</p>
              )}
              {loading && <p className="text-sm text-gray-400">Saving...</p>}

            </div>
            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              <ActiveCollborators />
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
