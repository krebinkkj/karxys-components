
import { Store } from '@sapphire/pieces';
import { Listener } from './Listener.js';
import { ListenerLoaderStrategy } from './ListenerLoaderStrategy.js';

export class ListenerStore extends Store<Listener, 'listeners'> {
	public constructor() {
		super(Listener, { name: 'listeners', strategy: new ListenerLoaderStrategy() });
	}
}
