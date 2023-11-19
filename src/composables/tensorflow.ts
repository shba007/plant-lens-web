import { ref, type Ref } from 'vue'
// import * as tf from '@tensorflow/tfjs';

const modelBaseURL = "/model/";

function roundOff(num: number, significance = 2) {
	return Math.round(num * (10 ** significance)) / (10 ** significance)
}

function runningAverage(nums: number[], newValue: number, bucketSize = 100) {
	if (nums.length >= bucketSize)
		nums.shift()

	nums.push(newValue)
	return nums.reduce((total, num) => total + num, 0) / nums.length
}

export function useTF(video: Ref<HTMLVideoElement | undefined>) {
	const isInit = ref(false)
	const enabled = ref(false)
	const fpsList: number[] = []
	const fps = ref(0)
	const plants = {
		'aloe-vera': [],
		'golden-barrel-cactus': [],
		'lavender': [],
		'rose': [],
	}
	const prediction = ref<{ name: 'aloe-vera' | 'golden-barrel-cactus' | 'lavender' | 'rose' | 'snake-plant', probability: number }>()

	let model: any | undefined;

	// Load the image model and setup the webcam
	async function init() {
		const modelURL = modelBaseURL + "model.json";
		const metadataURL = modelBaseURL + "metadata.json";

		// model = await tmImage.load(modelURL, metadataURL);
		model = await tmImage.load(modelURL, metadataURL);
		isInit.value = true
	}

	async function predict() {
		if (!model || !video.value)
			return

		const prediction = await model.predict(video.value);
		let output: any = null

		for (const { className, probability } of prediction) {
			if (!output) {
				output = { name: className, probability: probability.toFixed(2) * 100 }
			} else if (output.probability < probability * 100) {
				output.name = className
				output.probability = probability.toFixed(2) * 100
			}
		}

		return output
	}

	async function loop() {
		if (!enabled.value)
			return

		const start = performance.now()

		prediction.value = await predict();

		const end = performance.now()
		fps.value = roundOff(runningAverage(fpsList, 1000 / (end - start)), 0)

		window.requestAnimationFrame(loop);
	}

	return { isInit, enabled, init, loop, fps, prediction }
}