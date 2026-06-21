const database = require("../../../Model/dbConnect");

const getDashboardOverview = async (req, res) => {
  try {
    // Queries definitions
    const totalCarsQuery = "SELECT COUNT(*) AS totalCars FROM registered_vehicle";
    const revenueQuery = "SELECT SUM(amount) AS totalRevenue FROM payment_logs WHERE status = 'PAID'";
    const activeCarsQuery = "SELECT COUNT(*) AS activeCars FROM registered_vehicle WHERE status = 'AVAILABLE'";

    database.query(totalCarsQuery, (err, totalCarsResult) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      database.query(revenueQuery, (err, revenueResult) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        database.query(activeCarsQuery, (err, activeCarsResult) => {
          if (err) {
            console.error("Error activeCarsQuery:", err.message);
            return res.status(500).json({ error: err.message });
          };

          const totalCars = totalCarsResult && totalCarsResult[0] ? totalCarsResult[0].totalCars : 0;
          
          const rawRevenue = revenueResult && revenueResult[0] ? revenueResult[0].totalRevenue : 0;
          const totalRevenue = rawRevenue ? Number(rawRevenue) : 0; 

          const activeCars = activeCarsResult && activeCarsResult[0] ? activeCarsResult[0].activeCars : 0;

          return res.status(200).json({
            success: true,
            data: {
              totalCars: totalCars,
              totalRevenue: totalRevenue,
              activeCars: activeCars
            }
          });
        });
      });
    });

  } catch (error) {
    console.error("Dashboard Catch Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = getDashboardOverview;