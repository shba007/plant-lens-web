export enum PlantName {
  AloeVera = 'aloe-vera',
  Astilbe = 'astilbe',
  Bellflower = 'bellflower',
  BlackEyedSusan = 'black-eyed-susan',
  Bougainvillea = 'bougainvillea',
  Calendula = 'calendula',
  CaliforniaPoppy = 'california-poppy',
  Carnation = 'carnation',
  Chrysanthemum = 'chrysanthemum',
  CommonDaisy = 'common-daisy',
  Coreopsis = 'coreopsis',
  Daffodil = 'daffodil',
  Dahlia = 'dahlia',
  Dandelion = 'dandelion',
  GoldenBarrelCactus = 'golden-barrel-cactus',
  Hibiscus = 'hibiscus',
  Iris = 'iris',
  Jasmine = 'jasmine',
  Lavender = 'lavender',
  Lily = 'lily',
  Lotus = 'lotus',
  Magnolia = 'magnolia',
  Marigold = 'marigold',
  Rose = 'rose',
  SnakePlant = 'snake-plant',
  Sunflower = 'sunflower',
  Tulip = 'tulip',
  WaterLily = 'water-lily'
}

export interface PlantDetails {
  id: string
  name: string
  scientificName: string
  commonNames: string[]
  family: string
  description: string
}

export type PlantRecord = Record<PlantName, PlantDetails>
