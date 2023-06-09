// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class CounterIncrement extends ethereum.Event {
  get params(): CounterIncrement__Params {
    return new CounterIncrement__Params(this);
  }
}

export class CounterIncrement__Params {
  _event: CounterIncrement;

  constructor(event: CounterIncrement) {
    this._event = event;
  }
}

export class StartCounting extends ethereum.Event {
  get params(): StartCounting__Params {
    return new StartCounting__Params(this);
  }
}

export class StartCounting__Params {
  _event: StartCounting;

  constructor(event: StartCounting) {
    this._event = event;
  }
}

export class StopCounting extends ethereum.Event {
  get params(): StopCounting__Params {
    return new StopCounting__Params(this);
  }
}

export class StopCounting__Params {
  _event: StopCounting;

  constructor(event: StopCounting) {
    this._event = event;
  }
}

export class Counter extends ethereum.SmartContract {
  static bind(address: Address): Counter {
    return new Counter("Counter", address);
  }

  number(): BigInt {
    let result = super.call("number", "number():(uint256)", []);

    return result[0].toBigInt();
  }

  try_number(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("number", "number():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class CountUntilCall extends ethereum.Call {
  get inputs(): CountUntilCall__Inputs {
    return new CountUntilCall__Inputs(this);
  }

  get outputs(): CountUntilCall__Outputs {
    return new CountUntilCall__Outputs(this);
  }
}

export class CountUntilCall__Inputs {
  _call: CountUntilCall;

  constructor(call: CountUntilCall) {
    this._call = call;
  }

  get rec(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get count(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class CountUntilCall__Outputs {
  _call: CountUntilCall;

  constructor(call: CountUntilCall) {
    this._call = call;
  }
}

export class IncrementCall extends ethereum.Call {
  get inputs(): IncrementCall__Inputs {
    return new IncrementCall__Inputs(this);
  }

  get outputs(): IncrementCall__Outputs {
    return new IncrementCall__Outputs(this);
  }
}

export class IncrementCall__Inputs {
  _call: IncrementCall;

  constructor(call: IncrementCall) {
    this._call = call;
  }
}

export class IncrementCall__Outputs {
  _call: IncrementCall;

  constructor(call: IncrementCall) {
    this._call = call;
  }
}

export class SetNumberCall extends ethereum.Call {
  get inputs(): SetNumberCall__Inputs {
    return new SetNumberCall__Inputs(this);
  }

  get outputs(): SetNumberCall__Outputs {
    return new SetNumberCall__Outputs(this);
  }
}

export class SetNumberCall__Inputs {
  _call: SetNumberCall;

  constructor(call: SetNumberCall) {
    this._call = call;
  }

  get newNumber(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class SetNumberCall__Outputs {
  _call: SetNumberCall;

  constructor(call: SetNumberCall) {
    this._call = call;
  }
}
