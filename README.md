# react-rxjs-stream
Rxjs based lib to handle component communication using loose coupling pattern

# Loose Coupling
Sometimes you need to trasverse the entire app in order to get a simple signal from a component. Loose coupling is a simple pattern that allows to create streams and subscribe to them. 

# HOW TO

## Define streams 
export a new stream const (index.js)

```JS
import {Stream} from 'react-rxjs-stream';

// create upstream and downstream
const Streams = {
	inject: new Stream(),
	change: new Stream()
};

export default Streams;
``` 


## Component

Main Component (my-component.js)

```JS
import {StreamComponent} from 'react-rxjs-stream';
import {Streams} from './'; 
import ButtonComponent from './button-component';

export default class MyComponent extends StreamComponent {
    
    constructor(props) {
		super(props);

        // dispatcher
        let actions = {
            'ButtonComponent': x => {
                let {id, name, data} = x;
                console.log('Button is sending a message'); // x = {id: 'ButtonComponent', name: 'myName', {status: true}}
            }
        };

        // 'this.streamManager' is defined in StreamComponent class
        this.streamManager.dispatch(Streams.change, actions);

    }

    ...

    render() {
        return (
            <ButtonComponent streams={Streams} name="myName"></ButtonComponent>
        );
    }


}
```

Child Component (button-component.js)

```JS
import {StreamComponent} from 'react-rxjs-stream';

export default class ButtonComponent extends StreamComponent {
    
    constructor(props) {
	    super(props);
    }

    handleClick(evt) {
        // select change channel and emit
        // this.streams = this.props.streams
        this.streams.change.emit(
            'ButtonComponent',
            this.props.name, 
            {
                status: true
            }
        );
    }

    ...

    render() {
        return (
            <button onClick={this.handleClick}>CLICK</button>
        );
    }
}
```


