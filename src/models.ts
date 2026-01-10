export type UUID = string;

export type CampaignStatus = "new" | "active" | "paused" | "completed" | "throttled";

export interface Persona {
  id: UUID;
  name: string;
  description?: string;
}

export interface ICP {
  id: UUID;
  name: string;
  description?: string;
  attributes: Record<string, string | number | boolean>;
}

export interface Lead {
  id: UUID;
  companyName: string;
  domain?: string;
  title?: string;
  personaId?: UUID;
  icpFit?: number;
  enrichment: Record<string, string | number | boolean>;
}

export type SegmentTier = "tier_1" | "tier_2" | "tier_3";

export interface LeadSegment {
  leadId: UUID;
  tier: SegmentTier;
  score: number;
  reasons: string[];
}

export interface Campaign {
  id: UUID;
  name: string;
  status: CampaignStatus;
  createdAt: string;
  updatedAt: string;
  segmentTiers: SegmentTier[];
}
