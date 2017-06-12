import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/filter';

/**
 * Stream
 */
export default class Stream extends Subject {

	on(id, name) {
		return this.filter((data) => name
			? (data.id === id && data.name === name)
			: (data.id === id));
	}

    emit(id, name, data) {
        this.next({
            id,
            name,
            data
        });
    }
}