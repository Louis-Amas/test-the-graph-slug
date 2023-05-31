import { newMockEvent } from "matchstick-as"
import { ethereum } from "@graphprotocol/graph-ts"
import {
  CounterIncrement,
  StartCounting,
  StopCounting
} from "../generated/Counter/Counter"

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
