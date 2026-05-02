const database = require('../../../Model/dbConnect');

const getCarCategories = (req,res) => {
      const sql = `SELECT v.* , l.city_name FROM registered_vehicle v JOIN city_list l ON v.loc_id = l.loc_id`;
      database.query(sql , (err,result) => {
            if (err) {
                  console.error("Error fetching CarCategories information:", err)
             res.status(500).json({ error: "Failed to fetch CarCategories information" });
            } else {
                  res.json(result)
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

const vehRating = (req,res) => {
      const {carid} = req.params;
      const sql = " SELECT rating FROM  registered_vehicle as rv INNER JOIN ve_reviews as vr ON rv.carid = vr.carid WHERE rv.carid = ?";
      database.query(sql , [carid], (err ,result) => {
            if(err) {
                  console.log("Error fetching Car rating:", err);
                   res.status(500).json({ error: "Failed to fetch Rating details" });
            } else {
                  if (result.length === 0) {
                      return res.status(404).json({ message: "Rating not found" });
                  }
                  res.json(result); 
            }
      });
}


module.exports = {getCarCategories,getCarInfo,vehRating};