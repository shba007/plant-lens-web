import { ref } from 'vue'
import * as tf from '@tensorflow/tfjs'

export function useDB() {
  const isInit = ref(false)
  let data: { [key: string]: number[][] } = {}
  let totalClassCount = 0

  let labels: string[]
  let embeddings: number[][]

  async function init() {
    if (isInit.value) return

    const embeddingURL = `./model/features.json`

    data = await (await fetch(embeddingURL)).json()
    totalClassCount = Object.keys(data).length
    // console.log({ totalClassCount })

    const result = Object.entries(data).reduce(
      (total, [label, embeddings]) => {
        for (const embedding of embeddings) {
          total.embeddings.push(embedding)
          total.labels.push(label)
        }

        return total
      },
      { labels: [], embeddings: [] } as { labels: string[]; embeddings: number[][] }
    )

    labels = result.labels
    embeddings = result.embeddings

    isInit.value = true
  }

  function get(feature: tf.Tensor2D, topKSize = 10): number[] {
    // const distances = tf.tensor2d(embeddings).sub(feature).pow(2).sum<tf.Tensor1D>(1).sqrt()//.sum(1).div(tf.scalar(4))
    // const probabilities = distances.mul(-1 / 32).add<tf.Tensor1D>(1)
    // console.log({ probabilities: probabilities.arraySync() })

    const tensorEmbeddings = tf.tensor2d(embeddings)
    const normEmbeddings = tensorEmbeddings.div<tf.Tensor2D>(tensorEmbeddings.norm())
    const normFeature = feature.div<tf.Tensor1D>(feature.norm()).squeeze()
    const probabilities = normEmbeddings.dot(normFeature) as tf.Tensor1D

    const { indices } = tf.topk<tf.Tensor1D>(probabilities, topKSize)
    const topLabels = indices.arraySync().map((index) => parseInt(labels[index]))
    // console.log({ topLabels })

    const result = topLabels
      .reduce((totalList, label) => {
        totalList[label] += 1
        return totalList
      }, new Array<number>(totalClassCount).fill(0))
      .map((label) => label / topKSize)

    return result
  }

  return { init, get }
}
