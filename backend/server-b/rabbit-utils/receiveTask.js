#!/usr/bin/env node
// Process tasks from the work queue
// in our case an order for a sandwich

"use strict";

import amqp from "amqplib";
import { addTask } from "./sendTask.js";

//TODO: transform to async function
export const getTask = function (rabbitHost, queueName) {
  amqp
    .connect("amqp://" + rabbitHost)
    .then(function (conn) {
      process.once("SIGINT", function () {
        conn.close();
      });
      return conn.createChannel().then(function (ch) {
        var ok = ch.assertQueue(queueName, { durable: true });
        ok = ok.then(function () {
          ch.prefetch(1);
        });
        ok = ok.then(function () {
          ch.consume(queueName, doWork, { noAck: false });
          console.log(
            new Date(),
            " [*] Waiting for messages. To exit press CTRL+C"
          );
        });
        return ok;

        function doWork(msg) {
          var body = msg.content.toString();
          console.log(" [x] Received '%s'", body);
          var secs = body.split(".").length - 1;
          //console.log(" [x] Task takes %d seconds", secs);
          setTimeout(function () {
            console.log(new Date(), " [x] Done");
            addTask("rapid-runner-rabbit", "frontline-order-queue", body);
            ch.ack(msg);
          }, 10000);
        }
      });
    })
    .catch(console.warn);
};
