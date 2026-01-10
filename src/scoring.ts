import { ICP, Lead } from "./models.js";

export interface ScoreResult {
  score: number;
  reasons: string[];
}

const MAX_SCORE = 100;

export function scoreLeadAgainstIcp(lead: Lead, icp: ICP): ScoreResult {
  const reasons: string[] = [];
  let score = 0;

  for (const [key, targetValue] of Object.entries(icp.attributes)) {
    const leadValue = lead.enrichment[key];

    if (leadValue === undefined) {
      continue;
    }

    if (leadValue === targetValue) {
      score += 15;
      reasons.push(`Matched ${key} = ${targetValue}`);
      continue;
    }

    if (typeof targetValue === "number" && typeof leadValue === "number") {
      const delta = Math.abs(targetValue - leadValue);
      const bonus = Math.max(0, 12 - delta);
      if (bonus > 0) {
        score += bonus;
        reasons.push(`Close to ${key}: ${leadValue} vs ${targetValue}`);
      }
      continue;
    }

    if (typeof targetValue === "boolean" && typeof leadValue === "boolean") {
      reasons.push(`Mismatch on ${key}`);
      continue;
    }
  }

  if (lead.personaId) {
    score += 10;
    reasons.push("Persona aligned");
  }

  if (lead.title) {
    score += 5;
    reasons.push("Has title enrichment");
  }

  return {
    score: Math.min(score, MAX_SCORE),
    reasons,
  };
}
