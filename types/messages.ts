export type TMessage = {
  message: string;
  senderId: string;
  timestamp: number;
  username: string;
  senderImage: string;
  previousMessageUserId: string;
};

export interface ISender {
  id: string;
  username: string;
  title: string;
  image: string;
  isOnline: boolean;
}
export interface Person extends ISender {
  lastMessage: string;
  lastMessageTime: string;
}
export enum EFileType {
  PDF = "pdf",
  IMAGE = "image",
  DOCUMENT = "document",
  CODE = "code",
}

export type TChatFile = {
  url: string;
  fileType: EFileType;
  size: string;
  name: string;
};
