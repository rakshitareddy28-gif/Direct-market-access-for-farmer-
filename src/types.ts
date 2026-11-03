export interface SoilMetrics {
  soilType: string;
  organicMatterPercentage: number;
  phLevel: number;
  elevationMeters: number;
  irrigationMethod: string;
  seedLineage: string;
}

export interface Farmer {
  id: string;
  name: string;
  farmName: string;
  location: string;
  region: string;
  distanceKm: number;
  gpsCoords: {
    lat: number;
    lng: number;
  };
  portraitUrl: string;
  coverImageUrl: string;
  bio: string;
  payoutPercentage: number; // e.g. 88% direct payout
  acreage: number;
  farmingPhilosophy: string;
  certifications: string[];
  soilMetrics: SoilMetrics;
  generationsFarming: number;
}

export interface PriceBreakdown {
  farmerPayout: number;
  coldChainLogistics: number;
  platformFee: number;
}

export interface ProduceItem {
  id: string;
  name: string;
  botanicalName: string;
  category: 'Vegetables' | 'Fruits' | 'Mushrooms' | 'Grains' | 'Dairy & Apiary' | 'Herbs';
  price: number;
  unit: string;
  harvestTimeAgo: string;
  harvestTimestamp: string;
  farmerId: string;
  farmerName: string;
  farmName: string;
  distanceKm: number;
  imageUrl: string;
  terroirTag: string;
  flavorNotes: string[];
  nutrition: {
    calories: string;
    highlights: string[];
    shelfLifeDays: number;
  };
  inventoryKg: number;
  priceBreakdown: PriceBreakdown;
  harvestBatchCode: string;
  batchTempCelsius: number;
  description: string;
  tastingNotes: string;
  isPopular?: boolean;
}

export interface CartItem {
  produce: ProduceItem;
  quantity: number;
}

export interface RouteNode {
  id: string;
  stepName: string;
  location: string;
  timestamp: string;
  status: 'completed' | 'current' | 'upcoming';
  detail: string;
  temperatureCelsius?: number;
}

export interface ActiveDelivery {
  orderId: string;
  createdAt: string;
  estimatedArrivalMinutes: number;
  courierName: string;
  courierVehicle: string;
  temperatureSensorReading: number;
  currentRouteNodeIndex: number;
  routeNodes: RouteNode[];
  itemsCount: number;
  totalPaid: number;
  farmerPayoutTotal: number;
  destinationAddress: string;
}
