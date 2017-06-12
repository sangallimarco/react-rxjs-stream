import {
    Subject
} from 'rxjs/Subject';
import 'rxjs/add/operator/filter';

/**
 * Stream
 */
export default class Stream extends Subject {

    on(id, name = null) {
        return this.filter((data) => name ?
            (data.id === id && data.name === name) :
            (data.id === id));
    }

    emit(id, name = null, data = {}) {
        this.next({
            id,
            name,
            data
        });
    }
}