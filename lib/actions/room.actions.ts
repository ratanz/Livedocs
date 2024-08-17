'use server';

import { nanoid } from "nanoid";
import { liveblocks } from "@/lib/liveblocks";
import { revalidatePath } from "next/cache";
import { getAccessType, parseStringify } from "../utils";
import { redirect } from "next/navigation";
import { title } from "process";


export const createDocument = async ({
  userId,
  email,
}: CreateDocumentParams) => {
  const roomId = nanoid();

  try {
    const metadata = {
      creatorId: userId,
      email: email,
      title: "Untitled",
    };

    const usersAccesses: RoomAccesses = {
      [email]: ["room:write"],
    };

    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: [],
    });

    revalidatePath("/");

    return parseStringify(room);
  } catch (error) {
    console.log(`Error creating room: ${error}`);
  }
};

export const getDocument = async ({
  roomId,
  userId
}: {
  roomId: string;
  userId: string;
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    const hasAcess = Object.keys(room.usersAccesses).includes(userId);

    if (!hasAcess) {
      throw new Error("You do not have access to this room");
    }

    return parseStringify(room);
  } catch (error) {
    console.log(`Error getting room: ${error}`);
  }
};

export const updateDocument = async (roomId: string, title: string) => {
  try {
    const room = await liveblocks.updateRoom(roomId, {
      metadata: {
        title,
      },
    })

    revalidatePath(`/documents/${roomId}`);

    return parseStringify(room);

  } catch (error) {
    console.log(`Error updating room: ${error}`);
  }
}

export const getDocuments = async (email: string ) => {
  try {
      const rooms = await liveblocks.getRooms({ userId: email });
    
      return parseStringify(rooms);
  } catch (error) {
    console.log(`Error happened while getting rooms: ${error}`);
  }
}

export const updateDocumentAccess = async ({roomId, email, userType, updatedBy} : ShareDocumentParams) => {
  try {
    const usersAccesses : RoomAccesses = {
      [email]: getAccessType(userType) as AccessType,
    }

    const room = await liveblocks.updateRoom(roomId, {usersAccesses

    });


    if(room){
      const notifiationId = nanoid();

      await liveblocks.triggerInboxNotification({
        userId: email,
        kind : "$documentAccess",
        subjectId: notifiationId,
        activityData : {
          userType,
          title : `You have been granted access to this document by ${updatedBy.name} as ${userType}`,
          updatedBy : updatedBy.name,
          avatar : updatedBy.avatar,
          email : updatedBy.email,
        },
        roomId,
      })
    }

    revalidatePath(`/documents/${roomId}`);
    return parseStringify(room);

  } catch (error) {
    console.log(`Error updating room access: ${error}`);
  }
}

export const removeCollaborator = async ({roomId, email, } : {roomId : string, email : string}) => {
  try {
    const room = await liveblocks.getRoom(roomId);

    if(room.metadata.email === email){
      throw new Error("You cannot remove the owner of the document");
    }

    const updatedRoom = await liveblocks.updateRoom(roomId, {
      usersAccesses :{
        [email] : null
      }
    });

  } catch (error) {
    console.log(`Error removing collaborator: ${error}`);
  }
}

export const deleteDocument = async (roomId : string) => {
  try {
    await liveblocks.deleteRoom(roomId);
    revalidatePath("/");
    redirect("/");

  } catch (error) {
    console.log(`Error deleting room: ${error}`);
  }
}