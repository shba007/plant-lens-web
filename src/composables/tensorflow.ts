import { ref, type Ref } from 'vue'
import { PlantName } from '@/utils/model'
import * as tf from '@tensorflow/tfjs'
import { useDB } from './database'

const BUCKET_SIZE = 100

function roundOff(num: number, significance = BUCKET_SIZE) {
  return Math.round(num * 10 ** significance) / 10 ** significance
}

function runningAverage(nums: number[], newValue: number, bucketSize = 1) {
  if (nums.length >= bucketSize) nums.shift()

  nums.push(newValue)
  return nums.reduce((total, num) => total + num, 0) / nums.length
}

const plantNameList = Object.values(PlantName).map((name) => name)

export function useTF(video: Ref<HTMLVideoElement | undefined>) {
  const { init: DBinit, get: DBget } = useDB()
  const isInit = ref(false)
  const enabled = ref(false)
  const fpsArray: number[] = []
  const fps = ref(0)

  const prediction = ref<{ name: PlantName; probability: number }>()

  let model: tf.LayersModel | undefined

  async function init() {
    if (model === undefined) {
      const modelURL = `./model/model.json`
      model = await tf.loadLayersModel(modelURL)

      model.summary()
      model.predict(tf.zeros([1, 224, 224, 3]))

      await DBinit()
    }

    isInit.value = true
  }

  // TODO: Preprocessing function
  async function preprocess(video: HTMLVideoElement) {
    const frame = tf.browser.fromPixels(video)
    // Assuming video is a tensor
    // const padded = tf.pad(normalized, [[0, 0], [0, 0], [0, 0], [0, 1]]); // Pad to [224, 224, 3]
    const resized = tf.image.resizeBilinear(frame, [224, 224]) // Resize to 224x224
    const normalized = resized.div(tf.scalar(255.0)) // Normalize to [0, 1]
    const expanded = normalized.expandDims(0)
    return expanded
  }

  // Postprocessing function
  async function postprocess(feature: tf.Tensor2D): Promise<{ label: PlantName; probability: number }[]> {
    const probabilities = DBget(feature)
    const result = probabilities.map((value, index) => ({ label: plantNameList[index], probability: value }))

    return result
  }

  async function predict(): Promise<{ name: PlantName; probability: number } | undefined> {
    if (!model || !video.value) return

    const modelInput = await preprocess(video.value)
    const modelOutput = model.predict(modelInput) as tf.Tensor2D
    const prediction = await postprocess(modelOutput)

    let output: { name: PlantName; probability: number } | null = null

    for (const { label, probability } of prediction) {
      // plants[label].push(probability)

      // if (plants[label].length > BUCKET_SIZE) plants[label].shift()
      // const avg = runningAverage(plants[label], probability)

      if ((output?.probability ?? 0) < probability * 100) output = { name: label as PlantName, probability: probability * 100 }
    }

    return output as { name: PlantName; probability: number }
  }

  async function loop() {
    if (!enabled.value) return

    const start = performance.now()
    tf.engine().startScope()
    prediction.value = await predict()
    // console.log({ ...prediction.value })
    tf.engine().endScope()
    const end = performance.now()

    fps.value = roundOff(runningAverage(fpsArray, 1000 / (end - start)) as number, 0)
    window.requestAnimationFrame(loop)
  }

  return { isInit, enabled, init, loop, fps, prediction }
}
