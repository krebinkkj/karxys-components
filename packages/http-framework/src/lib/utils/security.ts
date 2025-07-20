import { webcrypto } from "crypto";

export type HeaderValue = string | string[]
export type Key = webcrypto.CryptoKey

const AlgotithmName = 'Ed25519'

function headerToString(header: HeaderValue): string {
    return typeof header === 'string' ? header : header[0]
}

export function makeKey(key: string): Promise<Key> {
    return webcrypto.subtle.importKey('raw', Buffer.from(key, 'hex'), { name: AlgotithmName }, true, ['verify'])
}

/**
 * @param body
 * @param signature
 * @param signature
 * @param key
 */
export async function verifyBody(body: string, signature: string | string[], timestamp: string | string[], key: Key) {
    const signatureData = Buffer.from(headerToString(signature), 'hex')
    const data = Buffer.isBuffer(body) ? Buffer.concat([Buffer.from(headerToString(timestamp)), body]) : Buffer.from(`${headerToString(timestamp)}${body}`)

    return webcrypto.subtle.verify(AlgotithmName, key, signatureData, Buffer.from(data))
}