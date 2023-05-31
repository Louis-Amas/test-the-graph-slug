import { BigInt, Bytes, Value } from "@graphprotocol/graph-ts"
import {
  Counter,
  CounterIncrement,
  StartCounting,
  StopCounting
} from "../generated/Counter/Counter"
import { CountingEntity } from "../generated/schema"
import { getEntity } from "../tests/counter-utils";
import { log } from "matchstick-as/assembly/log";



export function handleCounterIncrementTest(event: CounterIncrement): void {
  let entityFromCounterId = getEntity(event.transaction.hash);

  if (!entityFromCounterId) {
    return;
  }

  entityFromCounterId.count = entityFromCounterId.count.plus( BigInt.fromI32(1) );

  entityFromCounterId.save();
}

export function handleStartCounting(event: StartCounting): void {
  let entity = CountingEntity.load(event.transaction.hash);

  if (!entity) {
    entity = new CountingEntity(event.transaction.hash);
    entity.set('version', Value.fromI32(0));
    entity.count = BigInt.fromI32(0);
  } else {
    let version = entity.get('version');
    let versionInt = 1;
    if(!version) {
      // should never happen
    } else {
      versionInt = version.toI32()+1;
      entity.set('version', Value.fromI32(version.toI32() + 1));
    }

    let id = Bytes.fromUTF8(event.transaction.hash.toHex() + "-" + versionInt.toString());
    let newEntity = new CountingEntity(id);

    newEntity.count = BigInt.fromI32(0);
    entity.set('nextId', Value.fromBytes(id));

    newEntity.save();
  }

  entity.save();
}

export function handleStopCounting(event: StopCounting): void {
  let entity = getEntity(event.transaction.hash);
  if(entity == null) {
    return;
  }
  entity.set('stopped', Value.fromBoolean(true));
  entity.save();
}
