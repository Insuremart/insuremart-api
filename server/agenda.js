const { sendSMS, sendMessageToAdmin } = require('./lib/http');
const { Agenda } = require('agenda');
const moment = require('moment');

const isDev = process.env.NODE_ENV !== 'production';

// const mongoConnectionString = "mongodb://127.0.0.1/agenda";

const agenda = new Agenda({
  db: { address: isDev ? process.env.db_dev : process.env.db },
});

agenda.define('RESTART-PLANS', async (job) => {
  console.log('message -- ', 'RESTART-PLANS');
  sendMessageToAdmin('RESTART-PLANS');
});
agenda.define('RESTART-SUBSCRIPTIONS', async (job) => {
  console.log('message -- ', 'RESTART-SUBSCRIPTIONS');
  sendMessageToAdmin('RESTART-SUBSCRIPTIONS');
});

(async function () {
  // IIFE to give access to async/await
  await agenda.start();
  await agenda.every('1 days', 'RESTART-PLANS');
  await agenda.every('1 days', 'RESTART-SUBSCRIPTIONS');
})();
