import { ref, type Ref } from 'vue'
import { PlantName } from '@/utils/model'
import * as tf from '@tensorflow/tfjs';

const BUCKET_SIZE = 100

function roundOff(num: number, significance = BUCKET_SIZE) {
  return Math.round(num * (10 ** significance)) / (10 ** significance)
}

function runningAverage(nums: number[], newValue: number, bucketSize = 1) {
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
  let plantsFeature: tf.Tensor3D;
  const prediction = ref<{ name: PlantName, probability: number }>()

  let model: any | undefined;

  async function init() {
    if (model === undefined) {
      const modelURL = "/model/model.json";
      const featuresURL = "/model/features.json"

      model = await tf.loadLayersModel(modelURL);
      // await model.save('localstorage://plant-recognizer');
      model.summary()
      // warmup
      await model.predict(tf.zeros([1, 224, 224, 3]))

      plantsFeature = tf.tensor3d(await (await fetch(featuresURL)).json())
      console.log(plantsFeature.shape)
    }

    isInit.value = true
  }

  // TODO: Preprocessing function
  async function preprocess(video: HTMLVideoElement | tf.PixelData | ImageData | HTMLImageElement | HTMLCanvasElement | ImageBitmap) {
    const frame = tf.browser.fromPixels(video);
    // Assuming video is a tensor
    // const padded = tf.pad(normalized, [[0, 0], [0, 0], [0, 0], [0, 1]]); // Pad to [224, 224, 3]
    const resized = tf.image.resizeBilinear(frame, [224, 224]); // Resize to 224x224
    const normalized = resized.div(tf.scalar(255.0)); // Normalize to [0, 1]
    const expanded = normalized.expandDims(0)
    return expanded;
  }

  // Postprocessing function
  function postprocess(feature: tf.Tensor): { label: string, probability: number }[] {
    const distances = feature.sub(plantsFeature).pow(2).sum(2).sqrt().sum(1);
    const probabilities = tf.scalar(1).sub<tf.Tensor1D>(distances.div(distances.max()))
    // const normalizedProbabilities = probabilities.div<tf.Tensor1D>(probabilities.sum());

    // console.log({ probabilities: probabilities.arraySync(), normalizedProbabilities: normalizedProbabilities.arraySync() })

    return probabilities.arraySync().map((value, index) => ({ label: plantNameList[index], probability: value }))
  }

  async function predict(): Promise<{ name: PlantName; probability: number; } | undefined> {
    if (!model || !video.value)
      return

    const modelInput = await preprocess(video.value)
    const modelOutput = await model.predict(modelInput);
    const prediction = postprocess(modelOutput)

    let output: { name: PlantName; probability: number } | null = null

    for (const { label, probability } of prediction) {
      // @ts-ignore
      plants[label].push(probability)
      // @ts-ignore
      if (plants[label].length > BUCKET_SIZE)
        // @ts-ignore
        plants[label].shift()
      // @ts-ignore
      const avg = runningAverage(plants[label], probability)

      if (avg * 100 > 5 && (output?.probability ?? 0) < avg * 100)
        output = { name: label as PlantName, probability: avg * 100 }
    }

    return output as { name: PlantName; probability: number }
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