/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('calendarEvents').del()
  await knex('calendarEvents').insert([
    {
      id: 1,
      subscriptionId: 4,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: true,
    },
    {
      id: 2,
      subscriptionId: 2,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 3,
      subscriptionId: 3,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 4,
      subscriptionId: 4,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 5,
      subscriptionId: 5,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 6,
      subscriptionId: 6,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 7,
      subscriptionId: 6,
      scheduleDate: '2023-03-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 8,
      subscriptionId: 4,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: true,
    },
    {
      id: 9,
      subscriptionId: 2,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 10,
      subscriptionId: 3,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 11,
      subscriptionId: 4,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 12,
      subscriptionId: 5,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 13,
      subscriptionId: 6,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 14,
      subscriptionId: 6,
      scheduleDate: '2023-03-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 15,
      subscriptionId: 4,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: true,
    },
    {
      id: 16,
      subscriptionId: 2,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 17,
      subscriptionId: 3,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 18,
      subscriptionId: 4,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 19,
      subscriptionId: 5,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 20,
      subscriptionId: 6,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 21,
      subscriptionId: 6,
      scheduleDate: '2023-03-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 22,
      subscriptionId: 4,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: true,
    },
    {
      id: 23,
      subscriptionId: 2,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 24,
      subscriptionId: 3,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 25,
      subscriptionId: 4,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 26,
      subscriptionId: 5,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 27,
      subscriptionId: 6,
      scheduleDate: '2023-04-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 28,
      subscriptionId: 6,
      scheduleDate: '2023-03-12T08:41:30.872Z',
      isLastDate: false,
    },
    {
      id: 29,
      subscriptionId: 13,
      scheduleDate: '2023-05-05T03:13:01.685Z',
      auth0Id:'google-oauth2|116389011410626950352',
      isLastDate: false,
      isEmailSent: false
    },

  ])
}
