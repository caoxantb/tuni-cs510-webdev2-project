#!/usr/bin/env node
// Post a new task to the work queue
// in our case an order for a sandwich

"use strict";

import amqp from "amqplib";
import { orderHandler } from "./orderHandler.js";

//TODO: transform to async function
export const addTask = function (rabbitHost, queueName, order) {
  amqp.connect("amqp://" + rabbitHost).then(function (c) {
    c.createConfirmChannel().then(function (ch) {
      ch.sendToQueue(
        queueName,
        new Buffer.from(JSON.stringify(order)),
        {},
        function (err, ok) {
          if (err !== null) {
            orderHandler(order, "nacked");
            console.warn(new Date(), "Message nacked!");
          } else {
            orderHandler(order, "acked");
            console.log(new Date(), "Message acked");
          }
        }
      );
    });
  });
};
