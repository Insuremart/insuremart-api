const { response } = require('./http');


exports.findPaginated = async ({
  Model,
  query,
  sort = { updatedAt: -1 },
  page = 1,
  limit = 0,
}) =>
  Model.find(query)
    .sort(sort)
    .skip(limit * (page - 1))
    .limit(limit);

const findAndCountTotal = async ({
  Model,
  query,
  sort = { updatedAt: -1 },
  page,
  limit,
  lookup,
}) => { 
    const baseData = [
      { $sort: sort },
      { $skip: (page - 1) * limit },
      { $limit: +limit },
    ];
    const data = lookup ? [...baseData, ...lookup] : baseData;
    const result = await Model.aggregate([
      {
        $match: query,
      },
      {
        $facet: {
          total: [{ $count: 'count' }],
          data,
        },
      },
    ]).allowDiskUse(true);
    return result[0];
};
exports.findAndCountTotal = findAndCountTotal;

exports.getDocuments = async ({
  req,
  res,
  Model,
  query = {},
  lookup,
  sort = { updatedAt: -1 },
  transformer = (data) => data,
}) => {
  const {
    query: { limit = 10, page = 1 },
  } = req;
  const { data, total } = await findAndCountTotal({
    Model,
    query,
    sort,
    page,
    limit,
    lookup,
  });
  return response({
    res,
    message: `Successfully fetched list of ${Model.collection.collectionName}`,
    data: {
      total: total[0]?.count || 0,
      data: transformer(data),
    },
  });
};
