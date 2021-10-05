import { expect } from "chai";
import * as invoices from "../invoices.json";
import * as plays from "../plays.json";
import { statement } from "../app";

describe("Theatre Statement ", function () {
  it("Given a correct invoice return the correct information", function () {
    const invoice = invoices[0];
    const expectedStatement = `Statement for BigCo\nHamlet: $650.00 (55 seats)\nAs You Like It: $580.00 (35 seats)\nOthello: $500.00 (40 seats)\nAmount owed is $1,730.00\nYou earned 47 credits\n`;
    expect(statement(invoice, plays)).to.equal(expectedStatement);
  });

  it("Given a wrong invoice throw error", function () {
    const invoice = {
      customer: "BigCo",
      performances: [
        {
          playID: "potato",
          audience: 55,
        },
        {
          playID: "as-like",
          audience: 35,
        },
      ],
    };

    expect(function () {
      statement(invoice, plays);
    }).to.throw();
  });

  it("Given wrong plays information throw error", function () {
    const plays = {
      hamlet: { name: "Hamlet", type: "potato" },
      "as-like": { name: "As You Like It", type: "comedy" },
      othello: { name: "Othello", type: "tragedy" },
    };

    expect(function () {
      statement(invoices[0], plays);
    }).to.throw();
  });
});
