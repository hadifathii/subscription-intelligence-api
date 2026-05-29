import { verifyEvent } from "@subscription-protocol/sdk";

export function verifySignedEvent(signedEvent, publicKey) {
  return verifyEvent(signedEvent, publicKey);
}