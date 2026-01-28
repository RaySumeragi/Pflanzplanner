
export enum Sunlight {
  SUNNY = 'Sonne',
  PARTIAL = 'Halbschatten',
  SHADY = 'Schatten'
}

export enum Water {
  LOW = 'Wenig',
  MEDIUM = 'Mittel',
  HIGH = 'Viel'
}

export enum Size {
  SMALL = 'Klein',
  MEDIUM = 'Mittel',
  LARGE = 'Groß'
}

export enum Season {
  SPRING = 'Frühling',
  SUMMER = 'Sommer',
  AUTUMN = 'Herbst'
}

export interface Plant {
  id: string;
  name: string;
  icon: string;
  sun: Sunlight;
  water: Water;
  size: Size;
  season: Season;
  friends: string[]; // IDs of good neighbors
  enemies: string[]; // IDs of bad neighbors
  tip: string;
}

export interface GridCell {
  id: number;
  plantId: string | null;
}

export interface Feedback {
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

export type GardenType = 'bed' | 'raised-bed' | 'balcony';
