/**
 * Threat Intelligence
 * 
 * Standalone library for threat intelligence and indicators.
 */

export type ThreatType = 'malware' | 'phishing' | 'exploit' | 'botnet' | 'spam';

export interface Indicator {
  id: string;
  type: ThreatType;
  value: string;
  source?: string;
  addedAt: string;
}

export class ThreatIntel {
  private indicators: Map<string, Indicator>;

  constructor() {
    this.indicators = new Map();
  }

  add(type: ThreatType, value: string, source?: string): Indicator {
    const id = `indicator-${Date.now()}`;
    const indicator: Indicator = { id, type, value, source, addedAt: new Date().toISOString() };
    this.indicators.set(value, indicator);
    return indicator;
  }

  check(value: string): Indicator | null {
    return this.indicators.get(value) || null;
  }

  getByType(type: ThreatType): Indicator[] {
    return Array.from(this.indicators.values()).filter(i => i.type === type);
  }

  remove(value: string): boolean {
    return this.indicators.delete(value);
  }
}

export default ThreatIntel;
