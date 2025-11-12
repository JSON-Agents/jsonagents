/**
 * URI Validator for ajson:// scheme
 * 
 * Validates URIs according to RFC 3986 and the JSON Agents ajson:// scheme specification.
 */

export interface UriComponents {
  scheme: string;
  authority?: string;
  path: string;
  query?: string;
  fragment?: string;
}

export interface UriValidationResult {
  valid: boolean;
  message?: string;
  components?: UriComponents;
  httpsUrl?: string;
}

/**
 * Validate an ajson:// URI according to the specification
 */
export function validateAjsonUri(uri: string): UriValidationResult {
  // Check if URI starts with ajson://
  if (!uri.startsWith('ajson://')) {
    return {
      valid: false,
      message: 'URI must start with ajson:// scheme',
    };
  }

  // Parse the URI
  const components = parseUri(uri);
  if (!components) {
    return {
      valid: false,
      message: 'Invalid URI format',
    };
  }

  // Validate authority (domain name)
  if (!components.authority) {
    return {
      valid: false,
      message: 'URI must include an authority (domain) component',
    };
  }

  if (!isValidAuthority(components.authority)) {
    return {
      valid: false,
      message: `Invalid authority: ${components.authority}`,
    };
  }

  // Validate path
  if (!components.path || components.path === '/') {
    return {
      valid: false,
      message: 'URI must include a non-empty path',
    };
  }

  if (!isValidPath(components.path)) {
    return {
      valid: false,
      message: `Invalid path: ${components.path}`,
    };
  }

  // Generate HTTPS URL
  const httpsUrl = convertToHttps(components);

  return {
    valid: true,
    components,
    httpsUrl,
  };
}

/**
 * Parse a URI into its components
 */
function parseUri(uri: string): UriComponents | null {
  // RFC 3986 URI regex
  const uriRegex = /^([a-z][a-z0-9+.-]*):\/\/([^/?#]*)([^?#]*)(\?[^#]*)?(#.*)?$/i;
  const match = uri.match(uriRegex);

  if (!match) {
    return null;
  }

  return {
    scheme: match[1].toLowerCase(),
    authority: match[2] || undefined,
    path: match[3] || '/',
    query: match[4]?.substring(1) || undefined,
    fragment: match[5]?.substring(1) || undefined,
  };
}

/**
 * Validate authority component (domain name with optional port)
 */
function isValidAuthority(authority: string): boolean {
  // Check for userinfo (not recommended)
  if (authority.includes('@')) {
    console.warn('Warning: URIs with userinfo are not recommended for security reasons');
  }

  // Extract host (remove port if present)
  const host = authority.split('@').pop()?.split(':')[0] || '';

  // Validate domain name (basic check)
  const domainRegex = /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)*[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/i;
  return domainRegex.test(host);
}

/**
 * Validate path component
 */
function isValidPath(path: string): boolean {
  // Path must start with /
  if (!path.startsWith('/')) {
    return false;
  }

  // Check for valid characters (RFC 3986 pchar)
  const pathRegex = /^(\/[a-z0-9._~!$&'()*+,;=:@%-]*)+$/i;
  return pathRegex.test(path);
}

/**
 * Convert ajson:// URI to HTTPS URL
 */
function convertToHttps(components: UriComponents): string {
  let url = `https://${components.authority}/.well-known/json-agents${components.path}`;

  if (components.query) {
    url += `?${components.query}`;
  }

  if (components.fragment) {
    url += `#${components.fragment}`;
  }

  return url;
}

/**
 * Extract namespace and identifier from path
 */
export function extractNamespaceAndId(path: string): {
  namespace: string;
  identifier: string;
} | null {
  // Path format: /{namespace}/{identifier}
  const match = path.match(/^\/([^/]+)\/([^/]+)$/);
  
  if (!match) {
    return null;
  }

  return {
    namespace: match[1],
    identifier: match[2],
  };
}

/**
 * Validate a complete ajson:// URI and extract all information
 */
export function validateAndParseAjsonUri(uri: string): {
  valid: boolean;
  message?: string;
  domain?: string;
  namespace?: string;
  identifier?: string;
  httpsUrl?: string;
} {
  const result = validateAjsonUri(uri);

  if (!result.valid || !result.components) {
    return {
      valid: false,
      message: result.message,
    };
  }

  const nsId = extractNamespaceAndId(result.components.path);
  if (!nsId) {
    return {
      valid: false,
      message: 'Path must be in format /{namespace}/{identifier}',
    };
  }

  return {
    valid: true,
    domain: result.components.authority,
    namespace: nsId.namespace,
    identifier: nsId.identifier,
    httpsUrl: result.httpsUrl,
  };
}

export default {
  validateAjsonUri,
  validateAndParseAjsonUri,
  extractNamespaceAndId,
};
