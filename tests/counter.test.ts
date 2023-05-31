import { BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  afterAll,
  assert,
  clearStore,
  describe,
  test
} from "matchstick-as/assembly/index"
import { CountingEntity } from "../generated/schema"
import { countWithNestedCounts } from "./counter-utils"
import { log } from "matchstick-as/assembly/log";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0



describe("Describe entity assertions", () => {


  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ExampleEntity created and stored", () => {
    let transactionHash = countWithNestedCounts(2, null);
    assert.entityCount("CountingEntity", 3)

    let test = CountingEntity.load(transactionHash);
    if (!test) {
      return;
    }
    assert.bigIntEquals(BigInt.fromI32(2), test.count );

    let test2 = CountingEntity.load(Bytes.fromUTF8(transactionHash.toHex().toString() + '-1'));
    // assert.assertNotNull(test2)
    if (!test2) {
      log.error("test2 is null", [])
      return;
    }
    assert.bigIntEquals(BigInt.fromI32(1), test2.count);

    let test3 = CountingEntity.load(Bytes.fromUTF8(transactionHash.toHex().toString() + '-2'));
    // assert.assertNotNull(test3)
    if (!test3) {
      log.error("test3 is null", [])
      return;
    }
    assert.bigIntEquals(BigInt.fromI32(1), test3.count);

    let test4 = CountingEntity.load(Bytes.fromUTF8(transactionHash.toHex().toString() + '-3'));
    assert.assertNull(test4)
    // assert.fieldEquals('CountingEntity', transactionHash.toString() , 'count', '1');
    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
