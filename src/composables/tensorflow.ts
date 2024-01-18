import { ref, type Ref } from 'vue'
import { PlantName } from '@/model'
import * as tf from '@tensorflow/tfjs';

function roundOff(num: number, significance = 2) {
  return Math.round(num * (10 ** significance)) / (10 ** significance)
}

function runningAverage(nums: number[], newValue: number, bucketSize = 50) {
  if (nums.length >= bucketSize)
    nums.shift()

  nums.push(newValue)
  return nums.reduce((total, num) => total + num, 0) / nums.length
}

const plantNameList = Object.values(PlantName).map((name) => name)

export function useTF(video: Ref<HTMLVideoElement | undefined>) {
  const isInit = ref(false)
  const enabled = ref(false)
  const fpsArray: number[] = []
  const fps = ref(0)
  // @ts-ignore
  const plants: { [key in PlantName]: number[] } = Object.fromEntries(
    Object.values(PlantName).map((name) => [name, [] as number[]])
  );
  const prediction = ref<{ name: PlantName, probability: number }>()

  let model: any | undefined;

  async function init() {
    if (model === undefined) {
      const modelURL = "/model/model.json";

      model = await tf.loadLayersModel(modelURL);
      // await model.save('localstorage://plant-recognizer');
      model.summary()
      // warmup
      await model.predict(tf.zeros([1, 224, 224, 3]))
    }

    isInit.value = true
  }

  // Preprocessing function
  async function preprocess(video) {
    const frame = tf.browser.fromPixels(video);
    // Assuming video is a tensor
    // const padded = tf.pad(normalized, [[0, 0], [0, 0], [0, 0], [0, 1]]); // Pad to [224, 224, 3]
    const resized = tf.image.resizeBilinear(frame, [224, 224]); // Resize to 224x224
    const normalized = resized.div(tf.scalar(255.0)); // Normalize to [0, 1]
    const expanded = normalized.expandDims(0)
    return expanded;
  }

  // Postprocessing function
  function postprocess(output): { label: string, probability: number }[] {
    return Array.from(output.dataSync()).map((value, index) => ({ label: plantNameList[index], probability: value }))
  }

  async function predict() {
    if (!model || !video.value)
      return


    const modelInput = await preprocess(video.value)
    const modelOutput = await model.predict(modelInput);
    const prediction = postprocess(modelOutput)

    let output: any = null

    for (const { label, probability } of prediction) {
      // @ts-ignore
      plants[label].push(probability)
      // @ts-ignore
      if (plants[label].length > 100)
        // @ts-ignore
        plants[label].shift()
      // @ts-ignore
      const avg = runningAverage(plants[label], probability)

      if (!output || output.probability < avg * 100)
        output = { name: label, probability: parseFloat(avg.toFixed(2)) * 100 }
    }

    return output
  }

  async function loop() {
    if (!enabled.value)
      return

    const start = performance.now()
    tf.engine().startScope()
    prediction.value = await predict();
    console.log(prediction.value)
    tf.engine().endScope()
    const end = performance.now()

    fps.value = roundOff(runningAverage(fpsArray, 1000 / (end - start)) as number, 0)
    window.requestAnimationFrame(loop);
  }

  return { isInit, enabled, init, loop, fps, prediction }
}