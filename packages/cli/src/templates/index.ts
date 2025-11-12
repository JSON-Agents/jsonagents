export const templates = {
  router: {
    capabilities: [
      {
        type: 'routing',
        description: 'Routes queries to specialized agents based on intent',
      },
    ],
    tools: [
      {
        name: 'route_to_agent',
        type: 'function',
        description: 'Routes the query to the appropriate specialized agent',
        parameters: {
          type: 'object',
          properties: {
            target_agent: { type: 'string' },
            query: { type: 'string' },
          },
          required: ['target_agent', 'query'],
        },
      },
    ],
  },
  qa: {
    capabilities: [
      {
        type: 'qa',
        description: 'Answers questions using knowledge base',
      },
    ],
    tools: [
      {
        name: 'search_knowledge_base',
        type: 'http-request',
        endpoint: 'https://api.example.com/kb/search',
        method: 'GET',
      },
    ],
  },
  summarization: {
    capabilities: [
      {
        type: 'summarization',
        description: 'Summarizes documents and text',
      },
    ],
    tools: [
      {
        name: 'extract_text',
        type: 'function',
        description: 'Extracts text from documents',
      },
    ],
  },
  generation: {
    capabilities: [
      {
        type: 'generation',
        description: 'Generates content based on prompts',
      },
    ],
    tools: [],
  },
  retrieval: {
    capabilities: [
      {
        type: 'retrieval',
        description: 'Retrieves relevant information',
      },
    ],
    tools: [
      {
        name: 'vector_search',
        type: 'function',
        description: 'Performs vector similarity search',
      },
    ],
  },
  classification: {
    capabilities: [
      {
        type: 'classification',
        description: 'Classifies input into categories',
      },
    ],
    tools: [],
  },
  extraction: {
    capabilities: [
      {
        type: 'extraction',
        description: 'Extracts structured data from text',
      },
    ],
    tools: [],
  },
  custom: {
    capabilities: [],
    tools: [],
  },
};
