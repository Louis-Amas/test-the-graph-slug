import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import { CountingEntity, ExampleEntity } from "../generated/schema"
import { CounterIncrement } from "../generated/Counter/Counter"
import { handleCounterIncrementTest, handleStartCounting, handleStopCounting } from "../src/counter"
import { createCounterIncrementEvent, createStartCountingEvent, createStopCountingEvent } from "./counter-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

let transactionHash: Bytes;
describe("Describe entity assertions", () => {
  beforeAll(() => {
    let startCounting = createStartCountingEvent();
    transactionHash = startCounting.transaction.hash;
    
    handleStartCounting(startCounting);
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ExampleEntity created and stored", () => {
    assert.entityCount("CountingEntity", 1)

    let newCounterIncrementEvent = createCounterIncrementEvent()
    newCounterIncrementEvent.transaction.hash = transactionHash;
    handleCounterIncrementTest(newCounterIncrementEvent)

    let startCounting = createStartCountingEvent();
    startCounting.transaction.hash = transactionHash;
    handleStartCounting(startCounting);

    newCounterIncrementEvent = createCounterIncrementEvent()
    newCounterIncrementEvent.transaction.hash = transactionHash;
    handleCounterIncrementTest(newCounterIncrementEvent)

    newCounterIncrementEvent = createCounterIncrementEvent()
    newCounterIncrementEvent.transaction.hash = transactionHash;
    handleCounterIncrementTest(newCounterIncrementEvent)

    let stopCounting = createStopCountingEvent();
    stopCounting.transaction.hash = transactionHash;
    handleStopCounting(stopCounting);

    stopCounting = createStopCountingEvent();
    stopCounting.transaction.hash = transactionHash;
    handleStopCounting(stopCounting);

    assert.entityCount("CountingEntity", 2)

    let test = CountingEntity.load(transactionHash);
    if (!test) {
      return;
    }
    assert.bigIntEquals(BigInt.fromI32(1), test.count);

    let test2 = CountingEntity.load(Bytes.fromUTF8(transactionHash.toString() + '-1'));
    if (!test2) {
      return;
    }
    assert.bigIntEquals(BigInt.fromI32(2), test2.count);
    // assert.fieldEquals('CountingEntity', transactionHash.toString() , 'count', '1');
    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
