export default async function paginator(model, limit: number, page: number, options = {}) {
  const l = limit || 10;
  const p = page || 1;

  const { count, rows } = await model.findAndCountAll({
    limit: l,
    offset: (p - 1) * l,
    ...options,
  });

  return {
    pagination: {
      total: count,
      pageCount: Math.ceil(count / l),
      currentPage: p,
    },
    content: rows,
  };
}

