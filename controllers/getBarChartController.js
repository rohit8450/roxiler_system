import App from "../model/InventoryItemModel.js";

export const getBarChart = async (req, res) => {
  try {
    const monthNumber = parseInt(req.params.month);

    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Number.POSITIVE_INFINITY },
    ];

    const priceRangeCounts = await Promise.all(
      priceRanges.map(async ({ min, max }) => {
        const count = await App.countDocuments({
          month: monthNumber,
          price: { $gte: min, $lte: max },
        });

        return {
          range: `${min}-${max === Number.POSITIVE_INFINITY ? "above" : max}`,
          count,
        };
      })
    );

    res.status(200).json(priceRangeCounts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
