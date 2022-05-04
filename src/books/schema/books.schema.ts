class BooksSchema {
  getAllBooks() {
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

  getBook() {
    return {
      type: 'object',
      properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        description: { type: 'string' },
        author: { type: 'string' },
        year: { type: 'number' },
        cover: { type: 'string' },
        link: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
      },
    };
  }
}

export default new BooksSchema();