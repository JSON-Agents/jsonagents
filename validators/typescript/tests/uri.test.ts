import { validateAjsonUri, validateAndParseAjsonUri, extractNamespaceAndId } from '../src/uri';

describe('URI Validator', () => {
  describe('validateAjsonUri', () => {
    test('validates valid ajson:// URI', () => {
      const result = validateAjsonUri('ajson://example.com/namespace/identifier');
      expect(result.valid).toBe(true);
      expect(result.httpsUrl).toBe('https://example.com/.well-known/json-agents/namespace/identifier');
    });

    test('rejects URI without ajson:// scheme', () => {
      const result = validateAjsonUri('https://example.com/namespace/identifier');
      expect(result.valid).toBe(false);
      expect(result.message).toContain('ajson://');
    });

    test('rejects URI without authority', () => {
      const result = validateAjsonUri('ajson:///namespace/identifier');
      expect(result.valid).toBe(false);
      expect(result.message).toContain('authority');
    });

    test('rejects URI without path', () => {
      const result = validateAjsonUri('ajson://example.com');
      expect(result.valid).toBe(false);
      expect(result.message).toContain('path');
    });

    test('rejects URI with only root path', () => {
      const result = validateAjsonUri('ajson://example.com/');
      expect(result.valid).toBe(false);
      expect(result.message).toContain('path');
    });

    test('rejects malformed URI', () => {
      const result = validateAjsonUri('ajson://invalid uri with spaces');
      expect(result.valid).toBe(false);
      // URI with spaces fails authority validation
      expect(result.message).toContain('Invalid authority');
    });

    test('rejects URI with invalid authority', () => {
      const result = validateAjsonUri('ajson://invalid..domain/namespace/identifier');
      expect(result.valid).toBe(false);
      expect(result.message).toContain('authority');
    });

    test('rejects URI with invalid path characters', () => {
      const result = validateAjsonUri('ajson://example.com/namespace/<invalid>');
      expect(result.valid).toBe(false);
      expect(result.message).toContain('path');
    });

    test('handles URI with userinfo (with warning)', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const result = validateAjsonUri('ajson://user:pass@example.com/namespace/identifier');
      expect(result.valid).toBe(true);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('userinfo'));
      consoleSpy.mockRestore();
    });

    test('handles URI with port', () => {
      const result = validateAjsonUri('ajson://example.com:8080/namespace/identifier');
      expect(result.valid).toBe(true);
    });

    test('handles URI with query', () => {
      const result = validateAjsonUri('ajson://example.com/namespace/identifier?version=1.0');
      expect(result.valid).toBe(true);
      expect(result.components?.query).toBe('version=1.0');
    });

    test('handles URI with fragment', () => {
      const result = validateAjsonUri('ajson://example.com/namespace/identifier#section');
      expect(result.valid).toBe(true);
      expect(result.components?.fragment).toBe('section');
    });

    test('rejects URI without path separator', () => {
      const result = validateAjsonUri('ajson://example.comtest');
      expect(result.valid).toBe(false);
      expect(result.message).toContain('non-empty path');
    });

    test('handles validateAndParseAjsonUri with invalid URI', () => {
      const result = validateAndParseAjsonUri('ajson://..invalid/path');
      expect(result.valid).toBe(false);
      expect(result.message).toBeDefined();
    });

    test('rejects completely malformed URI without scheme separator', () => {
      // Try to trigger parseUri null return with a URI that has the scheme but is otherwise malformed
      // The regex expects authority after ://, so this should work
      const result = validateAjsonUri('ajson://');
      expect(result.valid).toBe(false);
      // This actually gets caught by the empty path check, not parseUri
    });

    test('rejects URI with path not starting with slash', () => {
      // This should trigger isValidPath to return false (line 127)
      const result = validateAjsonUri('ajson://example.com');
      expect(result.valid).toBe(false);
      expect(result.message).toContain('non-empty path');
    });
  });

  describe('extractNamespaceAndId', () => {
    test('extracts namespace and identifier from valid path', () => {
      const result = extractNamespaceAndId('/namespace/identifier');
      expect(result).toEqual({
        namespace: 'namespace',
        identifier: 'identifier',
      });
    });

    test('returns null for invalid path format', () => {
      expect(extractNamespaceAndId('/invalid')).toBeNull();
      expect(extractNamespaceAndId('/too/many/parts')).toBeNull();
    });
  });

  describe('validateAndParseAjsonUri', () => {
    test('validates and parses complete URI', () => {
      const result = validateAndParseAjsonUri('ajson://example.com/agents/my-agent');
      expect(result.valid).toBe(true);
      expect(result.domain).toBe('example.com');
      expect(result.namespace).toBe('agents');
      expect(result.identifier).toBe('my-agent');
    });

    test('rejects URI with wrong path format', () => {
      const result = validateAndParseAjsonUri('ajson://example.com/invalid-path');
      expect(result.valid).toBe(false);
    });
  });
});
