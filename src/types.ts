export interface VehicleTune {
  engineLevel: number; // 1 to 5
  suspensionStiffness: number; // 1 to 5
  tireGrip: number; // 1 to 5 (lower grip = more slide!)
  aeroWing: number; // 0 (none) to 3 (race wing)
  exhaustStage: number; // 1 to 3
}

export interface Vehicle {
  id: string;
  name: string;
  codename: string;
  year: number;
  origin: string;
  baseHp: number;
  baseTorque: number; // Nm
  weight: number; // kg
  topSpeedKmH: number;
  acceleration0to100: string; // e.g. "3.2s"
  imagePath: string;
  description: string;
  colorHex: string;
  features: string[];
}

export interface PreRegisterUser {
  email: string;
  platform: 'pc' | 'ps5' | 'xbox-series' | 'mobile';
  region: string;
  date: string;
}

export interface Milestone {
  target: number;
  current: number;
  rewardName: string;
  rewardDescription: string;
  rewardImage: string;
  unlocked: boolean;
}
