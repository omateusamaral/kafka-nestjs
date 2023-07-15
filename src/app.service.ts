import { Injectable } from '@nestjs/common';
import { ProducerService } from './kafka/producer.service';
import { ConsumerService } from './kafka/consumer.service';

@Injectable()
export class AppService {
  constructor(
    private readonly producerService: ProducerService,
    private readonly consumerService: ConsumerService,
  ) {}
  async produceMessage() {
    await this.producerService.produce({
      topic: 'test',
      messages: [
        {
          value: 'hello world2',
        },
      ],
    });
    // return 'Hello World!';
  }

  async consumeMessage() {
    this.consumerService.consume(
      { topics: ['test'] },
      {
        eachMessage: async ({ message, topic, partition }) => {
          console.log({
            value: message.value,
            topic: topic.toString(),
            partition: partition.toString(),
          });
        },
      },
    );
  }
}
