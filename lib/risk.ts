export type RiskConfig = {
  tolerancePercent: number;
  informalIncomePercent: number;
  attentionRatio: number;
  minimumGap: number;
};

export type RiskInput = {
  declaredIncome: number;
  patrimonialIncrease: number;
};

export function calculateRisk(input: RiskInput, config: RiskConfig) {
  const estimatedCapacity =
    input.declaredIncome *
    (1 + config.tolerancePercent / 100 + config.informalIncomePercent / 100);
  const gap = Math.max(0, input.patrimonialIncrease - estimatedCapacity);
  const ratio = estimatedCapacity === 0 ? Infinity : input.patrimonialIncrease / estimatedCapacity;
  const requiresAttention = gap >= config.minimumGap && ratio >= config.attentionRatio;

  return { estimatedCapacity, gap, ratio, requiresAttention };
}

