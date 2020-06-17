import Bee from "bee-queue";

import ExamCorrection from "../app/jobs/ExamCorrection";
import GenerateCertification from "../app/jobs/GenerateCertification";
import redisConfig from "../config/redis";

const jobs = [ExamCorrection, GenerateCertification];

interface QueueProp {
  [key: string]: {
    bee: Bee;
    handle: (data: any) => void;
  };
}

class Queue {
  private queues: QueueProp;

  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),

        handle,
      };
    });
  }

  add(queue: any, job: any) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on("failed", this.handleFailure).process(handle);
    });
  }

  handleFailure(job: any, error: any) {
    console.log(`Queue ${job.queue.name}: FAILED`, error);
  }
}

export default new Queue();
