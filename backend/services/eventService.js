const prisma = require("../config/prisma");
const cloudinary = require("../config/cloudinary");

const createEventService = async (data, organizerId, file) => {
  return await prisma.event.create({
    data: {
      title: data.title,
      description: data.description,
      venue: data.venue,
      category: data.category,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      maxCapacity: Number(data.maxCapacity),
      registrationFee: data.registrationFee ? Number(data.registrationFee) : null,
      upiId: data.upiId,
      bannerPublicId: file ? file.filename : null,
      organizerId,
    },
  });
};

const getAllEventsService = async (query) => {
  const { search, category } = query;

  return await prisma.event.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
                { venue: { contains: search, mode: "insensitive" } },
              ],
            }
          : {},
        category ? { category } : {},
      ],
    },
    include: {
      organizer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      registrations: true,
    },
    orderBy: {
      startTime: "asc",
    },
  });
};

const getSingleEventService = async (id) => {
  const event = await prisma.event.findUnique({
    where: { id: Number(id) },
    include: {
      organizer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      registrations: true,
    },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  return event;
};

const getMyEventsService = async (organizerId) => {
  return await prisma.event.findMany({
    where: { organizerId },
    include: {
      registrations: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const updateEventService = async (id, data, organizerId, file) => {
  const event = await prisma.event.findUnique({
    where: { id: Number(id) },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.organizerId !== organizerId) {
    throw new Error("You are not allowed to update this event");
  }

  let bannerPublicId = event.bannerPublicId;

  if (file) {
    if (event.bannerPublicId) {
      await cloudinary.uploader.destroy(event.bannerPublicId);
    }

    bannerPublicId = file.filename;
  }

  return await prisma.event.update({
    where: { id: Number(id) },
    data: {
      title: data.title ?? event.title,
      description: data.description ?? event.description,
      venue: data.venue ?? event.venue,
      category: data.category ?? event.category,
      startTime: data.startTime ? new Date(data.startTime) : event.startTime,
      endTime: data.endTime ? new Date(data.endTime) : event.endTime,
      maxCapacity: data.maxCapacity ? Number(data.maxCapacity) : event.maxCapacity,
      registrationFee: data.registrationFee !== undefined
        ? (data.registrationFee ? Number(data.registrationFee) : null)
        : event.registrationFee,
      upiId: data.upiId ?? event.upiId,
      bannerPublicId,
    },
  });
};

const deleteEventService = async (id, organizerId) => {
  const event = await prisma.event.findUnique({
    where: { id: Number(id) },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.organizerId !== organizerId) {
    throw new Error("You are not allowed to delete this event");
  }

  if (event.bannerPublicId) {
    await cloudinary.uploader.destroy(event.bannerPublicId);
  }

  await prisma.event.delete({
    where: { id: Number(id) },
  });

  return true;
};

module.exports = {
  createEventService,
  getAllEventsService,
  getSingleEventService,
  getMyEventsService,
  updateEventService,
  deleteEventService,
};