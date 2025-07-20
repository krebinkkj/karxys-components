import { SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder } from '@discordjs/builders';
import { isJSONEncodable, type JSONEncodable } from '@discordjs/util';
import { isFunction, isNullish } from '@sapphire/utilities';
import {
	ApplicationCommandOptionType,
	ApplicationCommandType,
	type APIApplicationCommandOption,
	type APIApplicationCommandSubcommandGroupOption,
	type APIApplicationCommandSubcommandOption,
	type RESTPostAPIChatInputApplicationCommandsJSONBody
} from 'discord-api-types/v10';
import type { Void } from '../../utils/internals.js';
import { getLinkedMethod, linkMethod } from '../shared/links';

/**
 * @internal
 */
export class ChatInputCommandResolver implements JSONEncodable<ChatInputCommandResolver.ResolvedCommand> {
	#data: ChatInputCommandResolver.ResolvedCommand | null = null;
	#commandData: ChatInputCommandResolver.CommandData | null = null;
	#subcommandGroupData: [method: string | null, ChatInputCommandResolver.SubcommandGroupData][] = [];
	#subcommandData: (readonly [method: string | null, groupName: string | null, data: ChatInputCommandResolver.SubcommandData])[] = [];

	/**
	 * @param data
	 * @returns
	 */
	public setCommand(data: ChatInputCommandResolver.CommandData) {
		this.#commandData = data;
		return this;
	}

	/**
	 * @param data
	 * @param method
	 * @returns
	 */
	public addSubcommandGroup(data: ChatInputCommandResolver.SubcommandGroupData, method?: string | null) {
		this.#subcommandGroupData.push([method ?? null, data]);
		return this;
	}

	/**
	 * @param data
	 * @param method
	 * @param groupName
	 * @returns
	 */
	public addSubcommand(data: ChatInputCommandResolver.SubcommandData, method?: string | null, groupName?: string | null): this {
		this.#subcommandData.push([method ?? null, groupName ?? null, data]);
		return this;
	}

	/**
	 * @returns
	 */
	public toJSON(): ChatInputCommandResolver.ResolvedCommand {
		return (this.#data ??= this.#resolve());
	}

	/**
	 * @returns
	 */
	#resolve(): ChatInputCommandResolver.ResolvedCommand {
		const command = this.#normalizeCommand(this.#commandData);
		this.#resolveSubcommandGroups(command);
		this.#resolveSubcommands(command);

		return command;
	}

	/**
	 * @param command
	 */
	#resolveSubcommandGroups(command: ChatInputCommandResolver.ResolvedCommand) {
		if (this.#subcommandGroupData.length === 0) return;

		command.options ??= [];
		for (const [method, entry] of this.#subcommandGroupData) {
			let data = this.#normalizeSubcommandGroup(entry);
			const index = command.options.findIndex((option) => option.name === data.name);
			if (index === -1) {
				command.options.push(data);
			} else {
				data = this.#mergeOption(command.options[index], data);
				command.options[index] = data;
			}

			if (method) linkMethod(data, method);
		}
	}

	/**
	 * @param command
	 */
	#resolveSubcommands(command: ChatInputCommandResolver.ResolvedCommand) {
		if (this.#subcommandData.length === 0) return;

		command.options ??= [];
		for (const [method, groupName, entry] of this.#subcommandData) {
			let data = this.#normalizeSubcommand(entry);

			let parent: ChatInputCommandResolver.ResolvedCommand | ChatInputCommandResolver.ResolvedSubcommandGroup;
			if (groupName === null) {
				parent = command;
			} else {
				const group = command.options.find((option) => option.name === groupName) as APIApplicationCommandOption | undefined;
				if (group === undefined) {
					throw new Error(`O comando '${command.name}' não tem subcomando com o nome '${groupName}'`);
				}

				if (group.type !== ApplicationCommandOptionType.SubcommandGroup) {
					throw new Error(`O comando '${command.name}' tem uma opção com o nome '${groupName}' mas não é um grupo`);
				}

				parent = group;
			}

			parent.options ??= [];
			const index = parent.options.findIndex((option) => option.name === data.name);
			if (index === -1) {
				parent.options.push(data);
			} else {
				data = this.#mergeOption(parent.options[index], data);
				parent.options[index] = data;
			}

			if (!method) continue;

			const dataMethod = getLinkedMethod(data);
			if (dataMethod) {
				if (dataMethod !== method) {
					throw new Error(`O comando '${command.name}' ja tem um subcomando com o nome '${data.name}' mas já está linkado para '${dataMethod}'`);
				}
			} else {
				linkMethod(data, method);
			}
		}
	}

	/**
	 * @param data
	 * @returns
	 * @throws
	 */
	#normalizeCommand(data: ChatInputCommandResolver.CommandData | null): ChatInputCommandResolver.ResolvedCommand {
		if (isNullish(data)) {
			throw new Error('Não foi possível normalizar o command data');
		}

		if (isFunction(data)) {
			const builder = new SlashCommandBuilder();
			data = data(builder) ?? builder;
		}

		return { type: ApplicationCommandType.ChatInput, ...(isJSONEncodable(data) ? data.toJSON() : data) };
	}

	/**
	 * @param data
	 * @returns
	 */
	#normalizeSubcommandGroup(data: ChatInputCommandResolver.SubcommandGroupData): ChatInputCommandResolver.ResolvedSubcommandGroup {
		if (isFunction(data)) {
			const builder = new SlashCommandSubcommandGroupBuilder();
			data = data(builder) ?? builder;
		}

		return { type: ApplicationCommandOptionType.SubcommandGroup, ...(isJSONEncodable(data) ? data.toJSON() : data) };
	}

	/**
	 * @param data
	 * @returns
	 */
	#normalizeSubcommand(data: ChatInputCommandResolver.SubcommandData): ChatInputCommandResolver.ResolvedSubcommand {
		if (isFunction(data)) {
			const builder = new SlashCommandSubcommandBuilder();
			data = data(builder) ?? builder;
		}

		return { type: ApplicationCommandOptionType.Subcommand, ...(isJSONEncodable(data) ? data.toJSON() : data) };
	}

	/**
	 * @param existing O array existente para os objetos do {@linkcode APIApplicationCommandOption}.
	 * @param data O data array para os objetos do {@linkcode APIApplicationCommandOption}.
	 * @returns O merged array para os objetos do {@linkcode APIApplicationCommandOption}.
	 */
	#mergeOptions(
		existing: APIApplicationCommandOption[] | undefined,
		data: APIApplicationCommandOption[] | undefined
	): APIApplicationCommandOption[] {
		if (!existing?.length) return data ?? [];
		if (!data?.length) return existing;

		const entries = new Map(existing.map((option) => [option.name, option]));
		for (const option of data) {
			entries.set(option.name, this.#mergeOption(entries.get(option.name), option));
		}

		return [...entries.values()];
	}

	/**
	 * @param existing
	 * @param data
	 * @returns
	 */
	#mergeOption<Option extends APIApplicationCommandOption>(existing: APIApplicationCommandOption | undefined, data: Option): Option {
		if (!existing) return data;
		if (existing.type !== data.type) {
			const existingType = ApplicationCommandOptionType[existing.type];
			const dataType = ApplicationCommandOptionType[data.type];
			throw new TypeError(`Mismatching types, esperado '${existingType}', mas foi recebido '${dataType}'`);
		}

		const merged =
			'options' in existing && 'options' in data
				? { ...existing, ...data, options: this.#mergeOptions(existing.options, data.options) }
				: { ...existing, ...data };

		const method = getLinkedMethod(data) ?? getLinkedMethod(existing);
		return method ? linkMethod(merged, method) : merged;
	}
}

export namespace ChatInputCommandResolver {
	export type CommandDataResolvable = Omit<ResolvedCommand, 'type'> | JSONEncodable<ResolvedCommand>;
	export type CommandData =
		| CommandDataResolvable //
		| ((builder: SlashCommandBuilder) => CommandDataResolvable | Void);

	export type SubcommandGroupDataResolvable = Omit<ResolvedSubcommandGroup, 'type'> | JSONEncodable<ResolvedSubcommandGroup>;
	export type SubcommandGroupData =
		| SubcommandGroupDataResolvable //
		| ((builder: SlashCommandSubcommandGroupBuilder) => SubcommandGroupDataResolvable | Void);

	export type SubcommandDataResolvable = Omit<ResolvedSubcommand, 'type'> | JSONEncodable<ResolvedSubcommand>;
	export type SubcommandData =
		| SubcommandDataResolvable //
		| ((builder: SlashCommandSubcommandBuilder) => SubcommandDataResolvable | Void);

	export type ResolvedCommand = RESTPostAPIChatInputApplicationCommandsJSONBody;
	export type ResolvedSubcommandGroup = APIApplicationCommandSubcommandGroupOption;
	export type ResolvedSubcommand = APIApplicationCommandSubcommandOption;
}