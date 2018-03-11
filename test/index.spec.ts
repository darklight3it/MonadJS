import * as mocha from 'mocha';
import * as chai from 'chai';

let should: Chai.Should = chai.should();

import HelloWorld from "../src/index";

describe("Hello World", () => {
  let helloWorld: HelloWorld = new HelloWorld();
  it("should print hello world and return 0", () => {
    helloWorld.hello().should.equal("Hello world");
  });
});