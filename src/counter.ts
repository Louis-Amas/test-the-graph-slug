import { BigInt, Bytes, Value } from "@graphprotocol/graph-ts"
import {
  Counter,
  CounterIncrement,
  StartCounting,
  StopCounting
} from "../generated/Counter/Counter"
import { CountingEntity } from "../generated/schema"

export function handleCounterIncrementTest(event: CounterIncrement): void {
  let entity = CountingEntity.load(event.transaction.hash);
  if (!entity) {
    return;
  }

  let id = entity.get('last');
  if (!id) {
    return;
  }

  let last = CountingEntity.load(id.toBytes());

  if (!last) {
    return;
  }

  last.count = last.count + BigInt.fromI32(1);

  last.save();
}

export function handleStartCounting(event: StartCounting): void {
  let entity = CountingEntity.load(event.transaction.hash);

  if (!entity) {
    entity = new CountingEntity(event.transaction.hash);
    entity.set('last', Value.fromBytes(event.transaction.hash));

    entity.count = BigInt.fromI32(0);
  } else {
    let id = Bytes.fromUTF8(event.transaction.hash.toHex() + "-" + "1");
    let newEntity = new CountingEntity(id);

    newEntity.count = BigInt.fromI32(0);
    entity.set('last', Value.fromBytes(id));

    newEntity.save();
  }

  entity.save();
}

export function handleStopCounting(event: StopCounting): void {
  // let entity = CountingEntity.load
}
