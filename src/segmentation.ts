import { ICP, Lead, LeadSegment, SegmentTier } from "./models.js";
import { scoreLeadAgainstIcp } from "./scoring.js";

export interface SegmentationRules {
  tier1Minimum: number;
  tier2Minimum: number;
}

export const defaultSegmentationRules: SegmentationRules = {
  tier1Minimum: 70,
  tier2Minimum: 45,
};

export function assignTier(score: number, rules: SegmentationRules): SegmentTier {
  if (score >= rules.tier1Minimum) {
    return "tier_1";
  }

  if (score >= rules.tier2Minimum) {
    return "tier_2";
  }

  return "tier_3";
}

export function segmentLeads(
  leads: Lead[],
  icp: ICP,
  rules: SegmentationRules = defaultSegmentationRules
): LeadSegment[] {
  return leads.map((lead) => {
    const { score, reasons } = scoreLeadAgainstIcp(lead, icp);
    return {
      leadId: lead.id,
      score,
      reasons,
      tier: assignTier(score, rules),
    };
  });
}
