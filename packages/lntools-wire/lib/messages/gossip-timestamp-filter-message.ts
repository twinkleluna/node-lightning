import { BufferCursor } from "@lntools/buffer-cursor";
import { MESSAGE_TYPE } from "../message-type";

export class GossipTimestampFilterMessage {
  public static deserialize(payload: Buffer): GossipTimestampFilterMessage {
    const instance = new GossipTimestampFilterMessage();
    const reader = new BufferCursor(payload);
    reader.readUInt16BE(); // read off type
    instance.chainHash = reader.readBytes(32);
    instance.firstTimestamp = reader.readUInt32BE();
    instance.timestampRange = reader.readUInt32BE();
    return instance;
  }

  public type: MESSAGE_TYPE = MESSAGE_TYPE.GOSSIP_TIMESTAMP_FILTER;
  public chainHash: Buffer;
  public firstTimestamp: number;
  public timestampRange: number;

  public serialize(): Buffer {
    const buffer = Buffer.alloc(
      2 + // type
      32 + // chain_hash
      4 + // first_timestamp
      4, // timestamp_range
    ); // prettier-ignore
    const writer = new BufferCursor(buffer);

    writer.writeUInt16BE(this.type);
    writer.writeBytes(this.chainHash);
    writer.writeUInt32BE(this.firstTimestamp);
    writer.writeUInt32BE(this.timestampRange);
    return buffer;
  }
}
