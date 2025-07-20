import { container } from "@sapphire/pieces";
import { err, ok, type Result } from "@sapphire/result";
import { isNullish, isNullishOrEmpty } from "@sapphire/utilities";
import type { IncomingMessage } from "node:http";
import { TextDecoder } from "node:util";
import { ErrorMessages } from "./constants";

/**
 * @param request
 * @returns
 */
export async function getSafeTextBody(request: IncomingMessage): Promise<Result.Err<string> | Result.Ok<string>> {
    let limit = container.client.bodySizeLimit

    if (!isNullishOrEmpty(request.headers['content-length'])) {
        const parsed = Number(request.headers['content-length'])
        if (!Number.isSafeInteger(parsed)) return err(ErrorMessages.InvalidContentLengthInteger);
        if (parsed <= 0) return err(ErrorMessages.InvalidContentLengthNegative);
        if (parsed > limit) return err(ErrorMessages.InvalidContentLengthTooBig);

        limit = parsed;
    }

    const decoder = new TextDecoder()

    let output = ''
    for await (const chunk of request) {
        const part = typeof chunk === 'string' ? chunk : decoder.decode(chunk, { stream: true });
        if (part.length + output.length > limit) return err(ErrorMessages.InvalidBodySize)

            output += part
    }

    const part = decoder.decode(undefined, { stream: false })
    if (part.length + output.length > limit) return err(ErrorMessages.InvalidBodySize);

    output += part

    return ok(output)

}
