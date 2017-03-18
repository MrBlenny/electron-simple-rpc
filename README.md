# RPC (Remote Procedure Call)

## Why?
It is a real PITA to call functions running in another electron thread/process. 

This system lets you not only easily call a function running in a different thread but also get a response.
Ultimatley, this is a fancy promise wrapper for electron's built-in IPC system.
It works the same in any type of electron thread.

## Install
`npm install electron-simple-rpc`

## Usage
The RPC system needs to be setup in every electron thread you which to communicate between. A typical example would be.

Main Electron Thread:
```javascript  
  import { RpcIpcManger, rpc } from 'rpc';
  
  // Specify the scope (this should be unique)
  const scope = 'electron';
  
  // Create the function lib
  const library = {
    ping = (inputs) => {
      console.log('ping ' + inputs)
      return 'pong from electron'
    }
  }
  
  const rpcIpcManager = new RpcIpcManger(library, scope);
    
```

Renderer Thread:
```javascript  
  import { RpcIpcManger } from 'rpc';
  
  / Specify the scope (this should be unique)
  const scope = 'renderer1';
  
  // Create the function lib
  const library = {}
  
  const rpcIpcManager = new RpcIpcManger(library, scope);
  
  // We send an RPC event from renderer -> electron
  rpc('electron', 'ping', 'from renderer').then(console.log)
  
```

Result:

Electron logs out:
`ping from renderer`

Renderer logs outs:
`pong from electron`

Note: This example shows renderer -> electron comms. The code is pretty much identical for renderer -> renderer or electron -> renderer. All you need to do is change the `scope`.

---

## Functions

### RPC Emit
rpc(scope, functionPathInLib, functionInputs);

This will emit an Remote Procedure Call action (which will travel
to all threads). This will run a function if scope is correct.

```javascript
@param string scope             - The destination threads scope (electron, main-renderer etc)
@param string functionPathInLib - The path to the function in the destination thread's lib
@param any functionInputs       - The function inputs (must be serialisable, i.e. object, string, number etc)

```

### RPC Manager
new RpcIpcManger(lib, scope);

This is used to receive and respond to RPC actions received over IPC.

```javascript
@param object lib   - The function library used with rpc
@param string scope - This thread's scope (electron, main-renderer etc)
```

### RPC Wrap.
rpcWrap(namespace, functions, scope);

This is used to wrap multiple functions in rpc emit.

```javascript
@param object namespace  - The function library used with rpc
@param array functions   - An array of function names
@param string scope      - The destination thread's scope (electron, main-renderer etc)
```
