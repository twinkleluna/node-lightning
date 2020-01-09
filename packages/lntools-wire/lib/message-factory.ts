import winston from "winston";
import { MESSAGE_TYPE } from "./message-type";
import { ChannelAnnouncementMessage } from "./messages/channel-announcement-message";
import { ChannelUpdateMessage } from "./messages/channel-update-message";
import { ErrorMessage } from "./messages/error-message";
import { GossipTimestampFilterMessage } from "./messages/gossip-timestamp-filter-message";
import { InitMessage } from "./messages/init-message";
import { NodeAnnouncementMessage } from "./messages/node-announcement-message";
import { PingMessage } from "./messages/ping-message";
import { PongMessage } from "./messages/pong-message";
import { QueryChannelRangeMessage } from "./messages/query-channel-range-message";
import { QueryShortChannelIdsMessage } from "./messages/query-short-channel-ids-message";
import { ReplyChannelRangeMessage } from "./messages/reply-channel-range-message";
import { ReplyShortChannelIdsEndMessage } from "./messages/reply-short-channel-ids-end-message";

const typeMap = {
  // control messages
  [MESSAGE_TYPE.INIT]: InitMessage,
  [MESSAGE_TYPE.ERROR]: ErrorMessage,
  [MESSAGE_TYPE.PING]: PingMessage,
  [MESSAGE_TYPE.PONG]: PongMessage,

  // channel messages
  // [MESSAGE_TYPE.ANNOUNCEMENT_SIGNATURES]: messages.AnnouncementSignaturesMessage,
  [MESSAGE_TYPE.NODE_ANNOUNCEMENT]: NodeAnnouncementMessage,
  [MESSAGE_TYPE.CHANNEL_ANNOUNCEMENT]: ChannelAnnouncementMessage,
  [MESSAGE_TYPE.CHANNEL_UPDATE]: ChannelUpdateMessage,

  [MESSAGE_TYPE.QUERY_SHORT_CHANNEL_IDS]: QueryShortChannelIdsMessage,
  [MESSAGE_TYPE.REPLY_SHORT_CHANNEL_IDS_END]: ReplyShortChannelIdsEndMessage,

  [MESSAGE_TYPE.QUERY_CHANNEL_RANGE]: QueryChannelRangeMessage,
  [MESSAGE_TYPE.REPLY_CHANNEL_RANGE]: ReplyChannelRangeMessage,

  [MESSAGE_TYPE.GOSSIP_TIMESTAMP_FILTER]: GossipTimestampFilterMessage,
};

function constructType(type: MESSAGE_TYPE): any {
  return typeMap[type];
}

export function deserialize(buffer) {
  const type = buffer.readUInt16BE();

  // tslint:disable-next-line: variable-name
  const Type = constructType(type);
  if (Type) return Type.deserialize(buffer);
  else winston.warn("unknown message type " + type);
}

export function construct(type: any, args: any[]) {
  // tslint:disable-next-line: variable-name
  const Type = constructType(type);
  return new Type(args);
}
