import { type ChatUserstate } from "tmi.js";

export type EventArguments = {
  channel: string;
  userstate: ChatUserstate;
  message: string;
  self: boolean;
};
