import { PlantName } from '@/model'
import { ref, type Ref } from 'vue'
// import * as tf from '@tensorflow/tfjs';

function roundOff(num: number, significance = 2) {
	return Math.round(num * (10 ** significance)) / (10 ** significance)
}

function runningAverage(nums: number[], newValue: number, bucketSize = 50) {
	if (nums.length >= bucketSize)
		nums.shift()

	nums.push(newValue)
	return nums.reduce((total, num) => total + num, 0) / nums.length
}

export function useTF(video: Ref<HTMLVideoElement | undefined>) {
	const isInit = ref(false)
	const enabled = ref(false)
	const fpsArray: number[] = []
	const fps = ref(0)
	const plants: Record<PlantName, number[]> = {
		'bougainvillea': [],
		'aloe-vera': [],
		'golden-barrel-cactus': [],
		'lavender': [],
		'rose': [],
		'snake-plant': [],
	}
	const prediction = ref<{ name: PlantName, probability: number }>()

	let model: any | undefined;

	async function init() {
		// model = await tf.loadLayersModel('localstorage://plant-recognizer');

		if (model === undefined) {
			const modelBaseURL = "/model/";
			const modelURL = modelBaseURL + "model.json";
			const metadataURL = modelBaseURL + "metadata.json";

			// @ts-ignore
			model = await tmImage.load(modelURL, metadataURL);
			// await model.save('localstorage://plant-recognizer');
		}

		isInit.value = true
	}

	async function predict() {
		if (!model || !video.value)
			return

		const prediction = await model.predict(video.value);
		let output: any = null

		for (const { className, probability } of prediction) {
			// @ts-ignore
			plants[className].push(probability)
			// @ts-ignore
			if (plants[className].length > 100)
				// @ts-ignore
				plants[className].shift()
			// @ts-ignore
			const avg = runningAverage(plants[className], probability)

			if (!output || output.probability < avg * 100)
				output = { name: className, probability: parseFloat(avg.toFixed(2)) * 100 }
		}
		return output
	}

	async function loop() {
		if (!enabled.value)
			return

		const start = performance.now()
		prediction.value = await predict();
		const end = performance.now()

		fps.value = roundOff(runningAverage(fpsArray, 1000 / (end - start)) as number, 0)
		window.requestAnimationFrame(loop);
	}

	return { isInit, enabled, init, loop, fps, prediction }
}