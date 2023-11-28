export enum PlantName {
	Marigold = "marigold",
	Jasmine = "jasmine",
	Rose = "rose",
	Hibiscus = "hibiscus",
	Sunflower = "sunflower",
	Dahlia = "dahlia",
	Lotus = "lotus",
	Bougainvillea = "bougainvillea",
	Chrysanthemum = "chrysanthemum",
	Lily = "lily",
	Lavender = "lavender",
	AloeVera = "aloe-vera",
	SnakePlant = "snake-plant",
	GoldenBarrelCactus = "golden-barrel-cactus",
}

export interface PlantDetails {
	id: string;
	name: string;
	scientificName: string;
	commonNames: string[];
	family: string;
	description: string;
}

export type PlantRecord = Record<PlantName, PlantDetails>;