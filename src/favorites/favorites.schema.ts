class FavoritesSchema {
  addToFavorites() {
    return {
      type: 'object',
      properties: {
        id: { type: 'number' },
        userId: { type: 'number' },
        bookId: { type: 'number' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    };
  }

  getFavoritesList() {
    return {
      type: 'object',
      properties: {
        pagination: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            pageCount: { type: 'number' },
            currentPage: { type: 'number' },
          },
        },
        content: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              title: { type: 'string' },
              author: { type: 'string' },
              year: { type: 'number' },
              cover: { type: 'string' },
              createdAt: { type: 'string' },
              updatedAt: { type: 'string' },
            },
          },
        },
      },
    };
  }
}

export default new FavoritesSchema();