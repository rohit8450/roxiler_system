export const getCombineData = async (req, res) => {
  try {
    const selectedMonthNumber = parseInt(req.params.month);

    const [totalStats, pieChart, barChart] = await Promise.all([
      fetch(`http://localhost:5100/api/v1/app/${selectedMonthNumber}/stats`),
      fetch(`http://localhost:5100/api/v1/app/${selectedMonthNumber}/pieChart`),
      fetch(`http://localhost:5100/api/v1/app/${selectedMonthNumber}/barChart`),
    ].map(async (fetchPromise) => {
      const response = await fetchPromise;
      return response.json();
    }));

    const combinedData = { totalStats, pieChart, barChart };

    res.status(200).json(combinedData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
