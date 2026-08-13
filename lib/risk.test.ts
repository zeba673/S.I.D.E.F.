import assert from "node:assert/strict";
import { calculateRisk } from "./risk.ts";

const config = {
  tolerancePercent: 25,
  informalIncomePercent: 35,
  attentionRatio: 1.35,
  minimumGap: 10_000_000,
};

assert.equal(
  calculateRisk({ declaredIncome: 100_000_000, patrimonialIncrease: 170_000_000 }, config)
    .requiresAttention,
  false,
);
assert.equal(
  calculateRisk({ declaredIncome: 40_000_000, patrimonialIncrease: 150_000_000 }, config)
    .requiresAttention,
  true,
);
console.log("risk calculation: ok");

