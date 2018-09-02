// Helper functions for communication with the database
"use strict";

const miscHelpers = require('../helpers/MiscHelpers');

// Creates a new subscriber
exports.createSubscriber = async (database, { firstName, lastName, email, subscriptionId }) => {
  try {
    if (!subscriptionId) { // If no subscriptionId is provided, generate a subscriptionId
      subscriptionId = miscHelpers.MakeRandomString(process.env.SUBSCRIPTION_ID_LENGTH);
    }
    // Check if a subscriber with given email exists
    const existingSubscriber = await database.models.subscriber.findOne({
      where: {
        email
      }
    });

    if (existingSubscriber) { // If the given email is already taken, a new subscriber cannot be created
      throw new Error(`${email} is already taken`);
    }

    // Creating a new subscriber
    const newSubscriber = await database.models.subscriber.create({
      firstName,
      lastName,
      email,
      subscriptionId
    });

    // Subscriber created, returning response
    return newSubscriber.dataValues;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.findSubscriberByEmail = async (database, email) => {
  try {
    // Fetch the subscriber from the database
    const subscriber = await database.models.subscriber.findOne({
      where: { email }
    });

    // Returning subscriber's data values or null if subscriber could not be found
    return subscriber ? subscriber.dataValues : null;
  } catch (err) {
    throw new Error(`Could not find subscriber ${err}`);
  }
};

// Removes an existing subscriber
exports.removeSubscriber = async (database, { email, subscriptionId }) => {
  try {
    // Remove the subscriber from the database
    await database.models.subscriber.destroy({
      where: {
        email,
        subscriptionId
      }
    });

    // Subscriber removed, returning response
    return { err: false };
  } catch (err) {
    throw new Error(`Could not remove subscriber: ${err}`);
  }
};

// Gets a list of all subscribers (admin use only)
exports.getSubscribers = async (database) => {
  try {
    // Get the list of all subscribers
    const subscribers = await database.models.subscriber.findAll({
      attributes: ['firstName', 'lastName', 'email', 'subscriptionId']
    });

    // List of all subscribers received, returning response
    return subscribers.map(s => s.dataValues);
  } catch (err) {
    throw new Error(`Could not list subscribers: ${err}`);
  }
};

// Creates a new subscription request
exports.createSubscriptionRequest = async (database, { subscriberEmail }) => {
  try {
    // Check if a subscription/subscription request already exist for the given email
    // if it does, use the existing subscriptionId
    const existingSubscriptionRequest = await database.models.subscriptionrequest.findOne({
      where: {
        subscriberEmail
      }
    });

    if (existingSubscriptionRequest) {
      // Subsription request already exists, returning
      return existingSubscriptionRequest.dataValues;
    }
    const existingSubscriber = await database.models.subscriber.findOne({
      where: {
        email: subscriberEmail
      }
    });

    if (existingSubscriber) {
      throw new Error(`Subscriber ${subscriberEmail} already exists!`);
    }
    // No form of preexisting subscription found, creating new subscription request
    const subscriptionId = miscHelpers.MakeRandomString(process.env.SUBSCRIPTION_ID_LENGTH);

    // Create subscription request
    const subRequest = await database.models.subscriptionrequest.create({
      subscriberEmail,
      subscriptionId
    });

    // Subscription request created, returning response
    return subRequest.dataValues;
  } catch (err) {
    throw new Error(`Could not create subscription request: ${err}`);
  }
};

// Confirms a subscription request
exports.confirmSubscriptionRequest = async (database, { subscriptionId, subscriberEmail }) => {
  try {
    // Find the subscription request in question
    const subRequest = await database.models.subscriptionrequest.findOne({
      where: {
        subscriptionId,
        subscriberEmail
      }
    });

    if (!subRequest) { // Specified subscription request does not exist
      throw new Error(`Subscription request for ${subscriberEmail} not found!`);
    }
    // Subscrition request has been confirmed and can now be removed from the database
    await subRequest.destroy();
    // Subscription request confirmed, returning response
    return { err: false };
  } catch (err) {
    throw new Error(`Could not confirm subscription request: ${err}`);
  }
};

exports.createCommitteeApplication = async (database, application) => {
  const existingApplication = await database.models.committeeapplication.findOne({
    where: {
      email: application.email
    }
  });

  if (existingApplication) {
    throw new Error(`${application.email} has already applied to the committee`);
  }
  const newApplication = await database.models.committeeapplication.create({
    firstName: application.firstName,
    lastName: application.lastName,
    email: application.email,
    subjectOfStudy: application.subjectOfStudy,
    gender: application.gender,
    teams: application.teams,
    reasonToJoin: application.reasonToJoin
  });

  return newApplication.dataValues;
};

exports.createVolunteerApplication = async (database, application) => {
  const existingApplication = await database.models.volunteerapplication.findOne({
    where: {
      email: application.email
    }
  });

  if (existingApplication) {
    throw new Error(`${application.email} has already applied to volunteer`);
  }
  const newApplication = await database.models.volunteerapplication.create({
    firstName: application.firstName,
    lastName: application.lastName,
    email: application.email,
    subjectOfStudy: application.subjectOfStudy,
    gender: application.gender,
    teams: application.teams,
    reasonToJoin: application.reasonToJoin
  });

  return newApplication.dataValues;
};
