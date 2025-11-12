import { JsonAgentsValidator } from '../src/validator';

describe('JsonAgentsValidator', () => {
  let validator: JsonAgentsValidator;

  beforeEach(() => {
    validator = new JsonAgentsValidator();
  });

  describe('Initialization', () => {
    it('should initialize successfully', () => {
      expect(validator).toBeDefined();
    });
  });

  describe('Minimal Valid Manifest', () => {
    it('should validate a minimal valid manifest', () => {
      const manifest = {
        manifest_version: '1.0',
        profiles: ['core'],
        agent: {
          id: 'ajson://example.com/agents/test',
          name: 'Test Agent',
          version: '1.0.0',
        },
        capabilities: [
          {
            id: 'echo',
            description: 'Echo service',
          },
        ],
        modalities: {
          input: ['text'],
          output: ['text'],
        },
      };

      const result = validator.validate(manifest);
      expect(result.valid).toBe(true);
      expect(result.errors).toBeUndefined();
    });
  });

  describe('Schema Validation', () => {
    it('should fail validation when manifest_version is missing', () => {
      const manifest = {
        profiles: ['core'],
        agent: {
          id: 'ajson://example.com/agents/test',
          name: 'Test Agent',
        },
      };

      const result = validator.validate(manifest);
      expect(result.valid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.some(e => e.includes('manifest_version'))).toBe(true);
    });
  });

  describe('URI Validation', () => {
    it('should validate agent.id URI', () => {
      const manifest = {
        manifest_version: '1.0',
        profiles: ['core'],
        agent: {
          id: 'ajson://example.com/agents/test',
          name: 'Test Agent',
          version: '1.0.0',
        },
        capabilities: [{ id: 'test', description: 'Test' }],
        modalities: { input: ['text'], output: ['text'] },
      };

      const result = validator.validate(manifest);
      expect(result.valid).toBe(true);
    });

    it('should catch invalid agent.id URI', () => {
      const manifest = {
        manifest_version: '1.0',
        profiles: ['core'],
        agent: {
          id: 'ajson://invalid domain/agents/test',
          name: 'Test Agent',
          version: '1.0.0',
        },
        capabilities: [{ id: 'test', description: 'Test' }],
        modalities: { input: ['text'], output: ['text'] },
      };

      const result = validator.validate(manifest);
      expect(result.valid).toBe(false);
      expect(result.errors?.some(e => e.includes('Agent ID'))).toBe(true);
    });

    it('should validate tool URIs with ajson:// scheme', () => {
      const manifest = {
        manifest_version: '1.0',
        profiles: ['core', 'exec'],
        agent: {
          id: 'ajson://example.com/agents/test',
          name: 'Test Agent',
          version: '1.0.0',
        },
        capabilities: [{ id: 'test', description: 'Test' }],
        modalities: { input: ['text'], output: ['text'] },
        tools: [
          {
            id: 'ajson://example.com/tools/http',
            name: 'HTTP Tool',
            type: 'function',
          },
          {
            id: 'local-tool',
            name: 'Local Tool',
            type: 'function',
          },
        ],
        runtime: {
          type: 'python',
          language: 'python',
          entrypoint: 'main:run',
        },
      };

      const result = validator.validate(manifest);
      expect(result.valid).toBe(true);
    });

    it('should catch invalid tool URI', () => {
      const manifest = {
        manifest_version: '1.0',
        profiles: ['core', 'exec'],
        agent: {
          id: 'ajson://example.com/agents/test',
          name: 'Test Agent',
          version: '1.0.0',
        },
        capabilities: [{ id: 'test', description: 'Test' }],
        modalities: { input: ['text'], output: ['text'] },
        tools: [
          {
            id: 'ajson://invalid domain/tools/bad',
            name: 'Bad Tool',
            type: 'function',
          },
        ],
        runtime: {
          type: 'python',
          language: 'python',
          entrypoint: 'main:run',
        },
      };

      const result = validator.validate(manifest);
      expect(result.valid).toBe(false);
      expect(result.errors?.some(e => e.includes('Tool[0]'))).toBe(true);
    });

    it('should validate graph node refs', () => {
      const manifest = {
        manifest_version: '1.0',
        profiles: ['core', 'graph'],
        agent: {
          id: 'ajson://example.com/agents/orchestrator',
          name: 'Orchestrator',
          version: '1.0.0',
        },
        capabilities: [{ id: 'orchestration', description: 'Orchestrate agents' }],
        modalities: { input: ['text'], output: ['text'] },
        graph: {
          nodes: [
            {
              id: 'agent1',
              ref: 'ajson://example.com/agents/worker1',
            },
            {
              id: 'agent2',
              ref: 'ajson://example.com/agents/worker2',
            },
          ],
        },
      };

      const result = validator.validate(manifest);
      expect(result.valid).toBe(true);
    });

    it('should catch invalid graph node ref', () => {
      const manifest = {
        manifest_version: '1.0',
        profiles: ['core', 'graph'],
        agent: {
          id: 'ajson://example.com/agents/orchestrator',
          name: 'Orchestrator',
          version: '1.0.0',
        },
        capabilities: [{ id: 'orchestration', description: 'Orchestrate agents' }],
        modalities: { input: ['text'], output: ['text'] },
        graph: {
          nodes: [
            {
              id: 'agent1',
              ref: 'ajson://invalid domain/agents/node',
            },
          ],
        },
      };

      const result = validator.validate(manifest);
      expect(result.valid).toBe(false);
      expect(result.errors?.some(e => e.includes('Graph node[0]'))).toBe(true);
    });
  });

  describe('Policy Validation', () => {
    it('should validate policy expressions', () => {
      const manifest = {
        manifest_version: '1.0',
        profiles: ['core', 'gov'],
        agent: {
          id: 'ajson://example.com/agents/test',
          name: 'Test Agent',
          version: '1.0.0',
        },
        capabilities: [{ id: 'test', description: 'Test' }],
        modalities: { input: ['text'], output: ['text'] },
        policies: [
          {
            id: 'test-policy',
            effect: 'deny',
            action: 'tool.call',
            where: "tool.type == 'http'",
          },
        ],
      };

      const result = validator.validate(manifest);
      expect(result.valid).toBe(true);
    });

    it('should catch invalid policy expression', () => {
      const manifest = {
        manifest_version: '1.0',
        profiles: ['core', 'gov'],
        agent: {
          id: 'ajson://example.com/agents/test',
          name: 'Test Agent',
          version: '1.0.0',
        },
        capabilities: [{ id: 'test', description: 'Test' }],
        modalities: { input: ['text'], output: ['text'] },
        policies: [
          {
            id: 'test-policy',
            effect: 'deny',
            action: 'tool.call',
            where: "tool.type === 'http'",
          },
        ],
      };

      const result = validator.validate(manifest);
      expect(result.valid).toBe(false);
      expect(result.errors?.some(e => e.includes('Policy[0]'))).toBe(true);
    });

    it('should validate graph edge conditions', () => {
      const manifest = {
        manifest_version: '1.0',
        profiles: ['core', 'graph'],
        agent: {
          id: 'ajson://example.com/agents/orchestrator',
          name: 'Orchestrator',
          version: '1.0.0',
        },
        capabilities: [{ id: 'orchestration', description: 'Orchestrate agents' }],
        modalities: { input: ['text'], output: ['text'] },
        graph: {
          nodes: [
            {
              id: 'agent1',
              ref: 'ajson://example.com/agents/worker1',
            },
            {
              id: 'agent2',
              ref: 'ajson://example.com/agents/worker2',
            },
          ],
          edges: [
            {
              from: 'agent1',
              to: 'agent2',
              condition: 'message.priority > 5',
            },
          ],
        },
      };

      const result = validator.validate(manifest);
      // Edge condition policy validation works - the test passes if condition is valid
      expect(result.valid).toBe(true);
    });

    it('should catch invalid edge condition', () => {
      const manifest = {
        manifest_version: '1.0',
        profiles: ['core', 'graph'],
        agent: {
          id: 'ajson://example.com/agents/orchestrator',
          name: 'Orchestrator',
          version: '1.0.0',
        },
        capabilities: [{ id: 'orchestration', description: 'Orchestrate agents' }],
        modalities: { input: ['text'], output: ['text'] },
        graph: {
          nodes: [
            {
              id: 'agent1',
              ref: 'ajson://example.com/agents/worker1',
            },
            {
              id: 'agent2',
              ref: 'ajson://example.com/agents/worker2',
            },
          ],
          edges: [
            {
              from: 'agent1',
              to: 'agent2',
              condition: 'message.priority === 5',
            },
          ],
        },
      };

      const result = validator.validate(manifest);
      expect(result.valid).toBe(false);
      expect(result.errors?.some(e => e.includes('Edge[0]'))).toBe(true);
    });
  });

  describe('Warnings', () => {
    it('should warn when no capabilities are declared', () => {
      const manifest = {
        manifest_version: '1.0',
        profiles: ['core'],
        agent: {
          id: 'ajson://example.com/agents/test',
          name: 'Test Agent',
          version: '1.0.0',
        },
        modalities: { input: ['text'], output: ['text'] },
      };

      const result = validator.validate(manifest);
      expect(result.valid).toBe(true);
      expect(result.warnings).toBeDefined();
      expect(result.warnings?.some(w => w.includes('capabilities'))).toBe(true);
    });

    it('should not warn when capabilities are declared', () => {
      const manifest = {
        manifest_version: '1.0',
        profiles: ['core'],
        agent: {
          id: 'ajson://example.com/agents/test',
          name: 'Test Agent',
          version: '1.0.0',
        },
        capabilities: [{ id: 'test', description: 'Test' }],
        modalities: { input: ['text'], output: ['text'] },
      };

      const result = validator.validate(manifest);
      expect(result.valid).toBe(true);
      expect(result.warnings).toBeUndefined();
    });
  });

  describe('Strict Mode', () => {
    it('should treat warnings as errors in strict mode', () => {
      const manifest = {
        manifest_version: '1.0',
        profiles: ['core'],
        agent: {
          id: 'ajson://example.com/agents/test',
          name: 'Test Agent',
          version: '1.0.0',
        },
        modalities: { input: ['text'], output: ['text'] },
      };

      const result = validator.validate(manifest, { strict: true });
      expect(result.valid).toBe(false);
      expect(result.errors?.some(e => e.includes('capabilities'))).toBe(true);
    });
  });

  describe('File Validation', () => {
    it('should handle invalid JSON gracefully', () => {
      const result = validator.validateFile('nonexistent-file.json');
      expect(result.valid).toBe(false);
      expect(result.message || result.errors?.[0]).toBeDefined();
    });
  });

  describe('Profile Checking', () => {
    it('should pass when all required profiles are present', () => {
      const manifest = {
        manifest_version: '1.0',
        profiles: ['core', 'exec', 'gov'],
        agent: { id: 'ajson://example.com/agents/test', name: 'Test' },
        capabilities: [],
        modalities: { input: ['text'], output: ['text'] },
      };

      const result = validator.checkProfiles(manifest, ['core', 'exec']);
      expect(result.valid).toBe(true);
    });

    it('should fail when required profiles are missing', () => {
      const manifest = {
        manifest_version: '1.0',
        profiles: ['core'],
        agent: { id: 'ajson://example.com/agents/test', name: 'Test' },
        capabilities: [],
        modalities: { input: ['text'], output: ['text'] },
      };

      const result = validator.checkProfiles(manifest, ['core', 'exec', 'graph']);
      expect(result.valid).toBe(false);
      expect(result.errors?.[0]).toContain('exec');
      expect(result.errors?.[0]).toContain('graph');
    });
  });

  describe('Validation Info', () => {
    it('should provide detailed validation information', () => {
      const manifest = {
        manifest_version: '1.0',
        profiles: ['core', 'exec'],
        agent: {
          id: 'ajson://example.com/agents/test',
          name: 'Test Agent',
          version: '1.0.0',
        },
        capabilities: [
          { id: 'cap1', description: 'Capability 1' },
          { id: 'cap2', description: 'Capability 2' },
        ],
        tools: [
          { id: 'tool1', name: 'Tool 1', type: 'function' },
          { id: 'tool2', name: 'Tool 2', type: 'function' },
          { id: 'tool3', name: 'Tool 3', type: 'function' },
        ],
        modalities: { input: ['text'], output: ['text'] },
        runtime: {
          type: 'python',
          language: 'python',
          entrypoint: 'main:run',
        },
      };

      const info = validator.getValidationInfo(manifest);
      expect(info.valid).toBe(true);
      expect(info.profiles).toEqual(['core', 'exec']);
      expect(info.capabilities).toBe(2);
      expect(info.tools).toBe(3);
      expect(info.extensions).toEqual([]);
    });
  });
});
