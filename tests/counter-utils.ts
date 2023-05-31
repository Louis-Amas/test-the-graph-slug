import { newMockEvent } from "matchstick-as"
import { Bytes, ethereum } from "@graphprotocol/graph-ts"
import {
  CounterIncrement,
  StartCounting,
  StopCounting
} from "../generated/Counter/Counter"
import { CountingEntity } from "../generated/schema"
import { handleCounterIncrementTest, handleStartCounting, handleStopCounting } from "../src/counter"
import { log } from "matchstick-as/assembly/log";

export function createCounterIncrementEvent(): CounterIncrement {
  let counterIncrementEvent = changetype<CounterIncrement>(newMockEvent())

  counterIncrementEvent.parameters = new Array()

  return counterIncrementEvent
}

export function createStartCountingEvent(): StartCounting {
  let startCountingEvent = changetype<StartCounting>(newMockEvent())

  startCountingEvent.parameters = new Array()

  return startCountingEvent
}

export function createStopCountingEvent(): StopCounting {
  let stopCountingEvent = changetype<StopCounting>(newMockEvent())

  stopCountingEvent.parameters = new Array()

  return stopCountingEvent
}
export function getEntity(hash: Bytes):CountingEntity|null {
  let entity = CountingEntity.load(hash);
  if (!entity) {
    return null;
  }

  let counterId = entity.get('nextId');
  if (!counterId) {
    return entity;
  }

  let nextId = CountingEntity.load(counterId.toBytes())
  if (!nextId) {
    return entity;
  }
  let stopped = nextId.get('stopped')
  if(stopped && stopped.toBoolean()) {
    return entity;
  }

  return nextId;
}


export function countWithNestedCounts(nestedAmount: number, hash: Bytes | null): Bytes{
  let startCounting = createStartCountingEvent();
  if(hash !== null) {
    startCounting.transaction.hash = hash!;
  } 
  handleStartCounting(startCounting);
  
  for(let i = 0; i < nestedAmount; i++) {
    let newCounterIncrementEvent = createCounterIncrementEvent()
    newCounterIncrementEvent.transaction.hash = startCounting.transaction.hash;
    handleCounterIncrementTest(newCounterIncrementEvent)
    if( nestedAmount-1 > 0) {
      countWithNestedCounts(nestedAmount-1, startCounting.transaction.hash);
    }
  }

  let stopCounting = createStopCountingEvent();
  stopCounting.transaction.hash = startCounting.transaction.hash;
  handleStopCounting(stopCounting);
  return startCounting.transaction.hash;
}