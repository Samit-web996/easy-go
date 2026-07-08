const database = require("../../../Model/dbConnect");

const getCarCategories = (req, res) => {
  const sql = `SELECT v.* , l.city_name FROM registered_vehicle v JOIN city_list l ON v.loc_id = l.loc_id`;
  database.query(sql, (err, result) => {
    if (err) {
      console.error("Error fetching CarCategories information:", err);
      res
        .status(500)
        .json({ error: "Failed to fetch CarCategories information" });
    } else {
      res.json(result);
    }
  });
};

const getCarInfo = (req, res) => {
  const { carid } = req.params;
  const sql = "SELECT * FROM registered_vehicle WHERE carid = ?";

  database.query(sql, [carid], (err, result) => {
    if (err) {
      console.error("Error fetching Car information:", err);
      res.status(500).json({ error: "Failed to fetch car details" });
    } else {
      if (result.length === 0) {
        return res.status(404).json({ message: "Car not found" });
      }
      res.json(result);
    }
  });
};

const vehRating = (req, res) => {
  const { carid } = req.params;

  const sql = `
    SELECT AVG(rating) as avgRating, COUNT(rating) as totalReviews 
    FROM ve_reviews 
    WHERE carid = ?`;

  database.query(sql, [carid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch Rating details" });
    }

    if (result.length === 0 || result[0].avgRating === null) {
      return res.status(200).json({
        avgRating: 0,
        totalReviews: 0,
        message: "No reviews yet",
      });
    }

    // Success response
    res.status(200).json(result[0]);
  });
};

module.exports = { getCarCategories, getCarInfo, vehRating };
