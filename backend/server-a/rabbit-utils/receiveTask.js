#!/usr/bin/env node
// Process tasks from the work queue

"use strict";

import amqp from "amqplib";
import { orderHandler } from "./orderHandler.js";

//TODO: transform to async function
export const getTask = function (rabbitHost, queueName) {
  amqp
    .connect("amqps://gqmgnypa:Hj2SOnLLJitVYl2qblfDDTHf_wR7BQYs@rat.rmq2.cloudamqp.com/gqmgnypa")
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
          console.log(" [*] Waiting for messages. To exit press CTRL+C");
        });
        return ok;

        async function doWork(msg) {
          var body = msg.content.toString();
          console.log(" [x] Received '%s'", body);
          await orderHandler(JSON.parse(body), "done");
          setTimeout(function () {
            console.log(" [x] Done");
            ch.ack(msg);
          }, 5000);
        }
      });
    })
    .catch(console.warn);
};
