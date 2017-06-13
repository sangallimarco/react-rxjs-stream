# react-rxjs-stream
Rxjs based lib to handle component communication using loose coupling pattern

# Loose Coupling
Sometimes you need to trasverse the entire app in order to get a simple signal from a component. Loose coupling is a simple pattern that allows to create streams and subscribe to them. 

# Install

```npm i react-rxjs-stream```

# HOW TO
Here below a short example 

## Streams 
export streams `index.js`
This is your communication channel, do not create instances inside your components but reuse the same instance/s

```JS
import {Stream} from 'react-rxjs-stream';

// create upstream and downstream (optional)
const Streams = {
	inject: new Stream(), // you can separate streams
	change: new Stream()
};

//...

export  {
    Streams,
    //...
};
``` 


## Component

Main Component `my-component.js`

```JS
import {StreamComponent} from 'react-rxjs-stream';
import {Streams} from './'; // custom streams from `index.js`
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

    //...

    render() {
        return (
            <ButtonComponent streams={Streams} name="myName"></ButtonComponent>
        );
    }


}
```

Child Component `button-component.js`

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

    //...

    render() {
        return (
            <button onClick={this.handleClick}>CLICK</button>
        );
    }
}
```

**Tips:**
you can store components id in a const and use Computed Property Names

```JS
// index.js
const components = {
    ButtonComponent: 'ButtonComponent'
};
// ...

//...

// component dispatcher
let {ButtonComponent} = components;
let actions = {
    [ButtonComponent]: x => {
        let {id, name, data} = x;
        console.log('Button is sending a message'); // x = {id: 'ButtonComponent', name: 'myName', {status: true}}
    }
};



```

# API

## `Stream`
Extends RxJS `Subject`

```JS
import {Stream} from 'react-rxjs-stream';
const stream = new Stream();
```

### `emit(id:string, name:string, data:object)`
Emit a new event

```JS
stream
    .emit('MyId', 'MyName', {
        status: true
    });
```

### `on(id:string, name:string)`
Filters events by id or id + name

```JS
let sub = stream
    .on('MyId', 'MyName')
    .subscribe(payload => {
        // let {id, name, data} = payload;
    });
```

## `StreamManager`
Handles multiple subscriptions

```JS
import {StreamManager} from 'react-rxjs-stream';
const streamManager = new StreamManager();
```

### `dispatch(stream:Stream, actions:object)`
Subscribes all actions to the stream

```JS
const stream = new Stream();
const actions = {
    'Button': x => {
        // code here
    }
};
streamManager.dispatch(stream, actions);
```

### `add(subscription)`
Add a `Stream` subscription to the manager

```JS
const stream = new Stream();
const sub =  stream.on('Button', 'Save');
streamManager.add(sub);
```

### `destroy()`
removes all subscriptions

```JS
streamManager.destroy();
```

## `StreamComponent`
Automatically adds an instance of `StreamManager` and destroys it on `componentWillUnmount`

```JS
import {StreamComponent} from 'react-rxjs-stream';
//...

export default class MyClass extends StreamComponent {

    constructor(props) {
        super(props);

        let actions = {
            'Button': payload => {
                // code here
            }
        }

        this.streamManager.dispatch(stream, actions);
    }

}

```
