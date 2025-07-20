import { LoaderStrategy } from '@sapphire/pieces';
import type { Listener } from './Listener.js';
import type { ListenerStore } from './ListenerStore.js';
export class ListenerLoaderStrategy extends LoaderStrategy<Listener> {
	/** 
	 * @param store
	 * @param piece
	 * @returns 
	 */
	public override onLoad(_store: ListenerStore, piece: Listener) {
		const emitter = piece.emitter!;

		const maxListeners = emitter.getMaxListeners();
		if (maxListeners !== 0) emitter.setMaxListeners(maxListeners + 1);

		// eslint-disable-next-line @typescript-eslint/dot-notation
		emitter.on(piece.event, piece['_listener']);
	}

	/**
	 * @param store 
	 * @param piece 
	 * @returns
	 */
	public override onUnload(_store: ListenerStore, piece: Listener) {
		const emitter = piece.emitter!;

		const maxListeners = emitter.getMaxListeners();
		if (maxListeners !== 0) emitter.setMaxListeners(maxListeners - 1);

		// eslint-disable-next-line @typescript-eslint/dot-notation
		emitter.off(piece.event, piece['_listener']);
	}
}
