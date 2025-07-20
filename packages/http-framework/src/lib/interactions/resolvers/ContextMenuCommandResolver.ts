import { ContextMenuCommandBuilder, type ContextMenuCommandType } from "@discordjs/builders";
import { isFunction, isNullish } from "@sapphire/utilities";
import type { RESTPostAPIContextMenuApplicationCommandsJSONBody } from "discord-api-types/v10";
import type { Void } from "../../utils/internals";
import { linkMethod } from "../shared/links";
import { type JSONEncodable, isJSONEncodable } from "@discordjs/util";

/**
 * O command resolver para os context menu commands
 * @internal
 */
export class ContextMenuCommandResolver implements JSONEncodable<ContextMenuCommandResolver.ResolvedCommand> {
    #data: ContextMenuCommandResolver.ResolvedCommand | null = null;
    #commandData: ContextMenuCommandResolver.CommandData | null = null;
    #commandType: ContextMenuCommandType | null = null;
    #commandMethod: string | null = null;

    /**
     * @param data
     * @param type
     * @param method
     * @returns
     */
    public setCommand(data: ContextMenuCommandResolver.CommandData, type: ContextMenuCommandType, method?: string | null) {
        this.#commandData = data;
        this.#commandType = type
        this.#commandMethod = method ?? null;
        return this
    }

    /**
     * Converte a instancia {@linkcode ContextMenuCommandResolver} para uma representação em JSON
     * @returns
     */
    public toJSON(): ContextMenuCommandResolver.ResolvedCommand {
        return (this.#data ??= this.#resolve())
    }

    /**
     * @returns O comando resolvido
     */
    #resolve(): ContextMenuCommandResolver.ResolvedCommand {
        const data = this.#commandData;
        const type = this.#commandType;
        if (isNullish(data) || isNullish(type)) {
            throw new Error('Falha em normalizar command data')
        }

        const resolved = this.#normalizeContextMenuCommand(data, type)
        return this.#commandMethod ? linkMethod(resolved, this.#commandMethod) : resolved
    }

    /**
     * Normaliza o context menu command
     * @param type
     * @param data
     * @returns
     */
    #normalizeContextMenuCommand(
        data: ContextMenuCommandResolver.CommandData,
        type: ContextMenuCommandType
    ): RESTPostAPIContextMenuApplicationCommandsJSONBody {
        if (isFunction(data)) {
            const builder = new ContextMenuCommandBuilder().setType(type);
            data = data(builder) ?? builder
        }

        return { type, ...(isJSONEncodable(data) ? data.toJSON() : data) }
    }
}

export namespace ContextMenuCommandResolver {
    export type CommandDataResolvable =
        | Omit<RESTPostAPIContextMenuApplicationCommandsJSONBody, 'type'>
        | JSONEncodable<RESTPostAPIContextMenuApplicationCommandsJSONBody>;
    
    export type CommandData =
        | CommandDataResolvable //
        | ((builder: ContextMenuCommandBuilder) => CommandDataResolvable | Void);
    
    export type ResolvedCommand = RESTPostAPIContextMenuApplicationCommandsJSONBody;
}