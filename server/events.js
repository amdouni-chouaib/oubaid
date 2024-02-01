// events.js

const express = require('express');
const router = express.Router();
const mongoose = require('./db');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const Event = mongoose.model('Event', {
  clubName: String,
  startDate: Date,
  finishDate: Date,
  category: String,
  description: String,
  isVirtual: Boolean,
  isPhysical: Boolean,
  location: {
    state: String,
    placeName: String,
    placeLink: String,
    locationDescription: String,
  },
  virtualDetails: {
    application: String,
    applicationLink: String,
  },
});

// Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Studenty API',
      version: '1.0.0',
      description: 'API for managing events for NGOs',
    },
  },
  apis: ['events.js'], // Your API routes file(s)
};

const specs = swaggerJsdoc(options);
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(specs));

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API for managing events
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         clubName:
 *           type: string
 *           description: The name of the club hosting the event
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The start date and time of the event
 *         finishDate:
 *           type: string
 *           format: date-time
 *           description: The finish date and time of the event
 *         category:
 *           type: string
 *           description: The category of the event
 *         description:
 *           type: string
 *           description: A brief description of the event
 *         isVirtual:
 *           type: boolean
 *           description: Indicates whether the event is virtual or physical
 *         isPhysical:
 *           type: boolean
 *           description: Indicates whether the event is physical
 *         location:
 *           type: object
 *           properties:
 *             state:
 *               type: string
 *               description: The state where the physical event is taking place
 *             placeName:
 *               type: string
 *               description: The name of the place for the event
 *             placeLink:
 *               type: string
 *               description: The link to the place for the event
 *             locationDescription:
 *               type: string
 *               description: A description of the event location
 *         virtualDetails:
 *           type: object
 *           properties:
 *             application:
 *               type: string
 *               description: The virtual event application/platform
 *             applicationLink:
 *               type: string
 *               description: The link to the virtual event application/platform
 */

/**
 * @swagger
 * /events/add:
 *   post:
 *     summary: Create a new event
 *     description: Create a new event with virtual or physical details
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Event created successfully!
 *       400:
 *         description: Invalid event type. Choose either virtual or physical.
 *         content:
 *           application/json:
 *             example:
 *               error: Invalid event type. Choose either virtual or physical.
 */

router.post('/add', async (req, res) => {
  try {
    const {
      clubName,
      startDate,
      finishDate,
      category,
      description,
      isVirtual,
      isPhysical,
      virtualDetails,
      location,
    } = req.body;

    if ((isVirtual && !isPhysical) || (!isVirtual && isPhysical)) {
      const newEvent = new Event({
        clubName,
        startDate,
        finishDate,
        category,
        description,
        isVirtual,
        isPhysical,
        virtualDetails: isVirtual
          ? {
              application: virtualDetails.application,
              applicationLink: virtualDetails.applicationLink,
            }
          : { application: '', applicationLink: '' },
        location: isPhysical
          ? {
              state: location.state || '',
              placeName: location.placeName || '',
              placeLink: location.placeLink || '',
              locationDescription: location.locationDescription || '',
            }
          : {
              state: '',
              placeName: '',
              placeLink: '',
              locationDescription: '',
            },
      });

      await newEvent.save();

      res.json({ success: true, message: 'Event created successfully!' });
    } else {
      res
        .status(400)
        .json({ error: 'Invalid event type. Choose either virtual or physical.' });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: 'Error creating event. Please try again.',
      });
  }
});

/**
 * @swagger
 * /events/getall:
 *   get:
 *     summary: Get all events
 *     description: Get a list of all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
 *         content:
 *           application/json:
 *             example:
 *               - clubName: Example Club
 *                 startDate: "2024-01-31T12:00:00Z"
 *                 finishDate: "2024-01-31T15:00:00Z"
 *                 category: Sports
 *                 description: Example event description
 *                 isVirtual: false
 *                 isPhysical: true
 *                 location:
 *                   state: California
 *                   placeName: Example Stadium
 *                   placeLink: http://example-stadium.com
 *                   locationDescription: Example location description
 *                 virtualDetails:
 *                   application: ""
 *                   applicationLink: ""
 */

// Get all events
router.get('/getall', (req, res) => {
  Event.find({})
    .lean() // Convert documents to plain JavaScript objects
    .then(events => {
      res.status(200).json(events);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

/**
 * @swagger
 * /events/getone/{id}:
 *   get:
 *     summary: Get a specific event by ID
 *     description: Get details of a specific event by its ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event details
 *         content:
 *           application/json:
 *             example:
 *               clubName: Example Club
 *               startDate: "2024-01-31T12:00:00Z"
 *               finishDate: "2024-01-31T15:00:00Z"
 *               category: Sports
 *               description: Example event description
 *               isVirtual: false
 *               isPhysical: true
 *               location:
 *                 state: California
 *                 placeName: Example Stadium
 *                 placeLink: http://example-stadium.com
 *                 locationDescription: Example location description
 *               virtualDetails:
 *                 application: ""
 *                 applicationLink: ""
 *       404:
 *         description: Event not found
 */

// Get a specific event by ID
router.get('/getone/:id', (req, res) => {
  const eventId = req.params.id;

  Event.findById(eventId)
    .then(event => {
      if (!event) {
        res.status(404).send('Event not found');
      } else {
        const virtualDetails = event.isVirtual ? event.virtualDetails : null;

        res.status(200).json({
          ...event._doc,
          virtualDetails,
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

/**
 * @swagger
 * /events/update/{id}:
 *   put:
 *     summary: Update a specific event by ID
 *     description: Update details of a specific event by its ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Event updated successfully!
 *       404:
 *         description: Event not found
 */

// Update a specific event by ID
router.put('/update/:id', (req, res) => {
  const eventId = req.params.id;
  const updatedEventData = req.body;

  Event.findByIdAndUpdate(eventId, updatedEventData, { new: true })
    .then(updatedEvent => {
      if (!updatedEvent) {
        res.status(404).send('Event not found');
      } else {
        res.status(200).json({
          success: true,
          message: 'Event updated successfully!',
        });
      }
    })
    .catch(err => {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: 'Internal Server Error' });
    });
});

/**
 * @swagger
 * /events/delete/{id}:
 *   delete:
 *     summary: Delete a specific event by ID
 *     description: Delete a specific event by its ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the event to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Event "Example Club" deleted successfully
 *       404:
 *         description: Event not found
 */

// Delete a specific event by ID
router.delete('/delete/:id', (req, res) => {
  const eventId = req.params.id;

  Event.findByIdAndDelete(eventId)
    .then(deletedEvent => {
      if (!deletedEvent) {
        res.status(404).send('Event not found');
      } else {
        // You can choose a specific property to send back, like the event name
        res.status(200).json({
          message: `Event "${deletedEvent.clubName}" deleted successfully`,
        });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;
