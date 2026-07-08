const database = require('../../../Model/dbConnect');

const getCarDistribution = async (req,res) => {
      const querry = "SELECT category, COUNT(*) AS count FROM registered_vehicle GROUP BY category";

      database.query(querry, (err,result) => {
            if (err) {
                  console.error("Error distributionQuery:", err.message);
                  return res.status(500).json({success: false, error: err.message});
                  };

                  return res.status(200).json({
                        success: true,
                        data: result
                  });
      });
};

module.exports = getCarDistribution;