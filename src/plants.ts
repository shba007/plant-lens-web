export interface Plant {
	id: string;
	name: string;
	scientificName: string;
	commonNames: string[];
	family: string;
	description: string;
}

interface Plants {
	"aloe-vera": Plant;
	rose: Plant;
	lavender: Plant;
	"snake-plant": Plant;
	"golden-barrel-cactus": Plant;
}

export const plants: Plants = {
	"aloe-vera": {
		id: "aloe-vera",
		name: "Aloe Vera",
		scientificName: "Aloe barbadensis Miller",
		commonNames: ["Aloe", "Burn Plant", "First Aid Plant"],
		family: "Asphodelaceae",
		description: `Aloe vera is a succulent, perennial, xerophytic plant.
      It has turgid green leaves joined at the stem in a rosette pattern.
      The leaves are up to 60 cm in length, lanceolate with serrated spine-like margins and an acute leaf apex. The leaves may produce a yellow, milky latex.`,
	},
	"rose": {
		id: "rose",
		name: "Rose",
		scientificName: "Rosa rubiginosa",
		commonNames: ["Rose"],
		family: "Rosaceae",
		description: `Roses are woody, perennial flowering plants with thorny stems.
      They are known for their fragrant flowers, typically with five petals.
      Roses come in various colors and are widely cultivated for ornamental and symbolic purposes.`,
	},
	"lavender": {
		id: "lavender",
		name: "Lavender",
		scientificName: "Lavandula",
		commonNames: ["Lavandula angustifolia", "L. vera"],
		family: "Lamiaceae",
		description: `Lavender is a fragrant herb with narrow, aromatic leaves and spikes of violet-blue flowers.
      It is known for its soothing fragrance and is commonly used in aromatherapy, perfumes, and culinary applications.`,
	},
	"snake-plant": {
		id: "snake-plant",
		name: "Snake Plant",
		scientificName: "Sansevieria trifasciata",
		commonNames: ["Mother-in-law's Tongue"],
		family: "Asparagaceae",
		description: `The Snake Plant is a hardy, evergreen succulent with long, upright leaves.
      Its leaves are typically green with variegated patterns.
      Snake plants are known for their air-purifying qualities and adaptability to low light conditions.`,
	},
	"golden-barrel-cactus": {
		id: "golden-barrel-cactus",
		name: "Golden Barrel Cactus",
		scientificName: "Echinocactus grusonii",
		commonNames: ["Golden Barrel Cactus"],
		family: "Cactaceae",
		description: `The Golden Barrel Cactus is a spherical cactus with a distinctive golden-yellow color.
      It is covered in numerous sharp spines and is native to arid regions of Mexico.
      This cactus is popular in xeriscape gardens and is well-suited to dry, desert environments.`,
	},
}