const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    // Driver joins their own room
    socket.on("driver:join", (driverId) => {
      socket.join(`driver:${driverId}`);
      console.log(`🚗 Driver ${driverId} joined`);
    });

    // Customer joins booking tracking room
    socket.on("tracking:join", (bookingId) => {
      socket.join(`booking:${bookingId}`);
      console.log(`📍 Tracking joined for booking: ${bookingId}`);
    });

    // Driver sends live location update
    socket.on("location:update", ({ vehicleId, bookingId, latitude, longitude }) => {
      const payload = { vehicleId, latitude, longitude, timestamp: new Date() };
      // Broadcast to everyone tracking this booking
      io.to(`booking:${bookingId}`).emit("location:update", payload);
      // Also broadcast to admin dashboard
      io.to("admin:dashboard").emit("fleet:location", payload);
    });

    // Admin joins dashboard room
    socket.on("admin:join", () => {
      socket.join("admin:dashboard");
      console.log(`🛡️ Admin joined dashboard`);
    });

    // Booking status change notification
    socket.on("booking:statusChange", ({ customerId, bookingId, status }) => {
      io.to(`user:${customerId}`).emit("booking:update", { bookingId, status });
    });

    // Customer joins their own notification room
    socket.on("user:join", (userId) => {
      socket.join(`user:${userId}`);
    });

    socket.on("disconnect", () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });
};

module.exports = { setupSocket };
