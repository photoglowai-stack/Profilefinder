import { ServiceType } from './serviceColors';

/**
 * Resolves the service ID from multiple sources with fallback chain.
 * Priority: context > location.state > URL query > default
 */
export function resolveServiceId({
    contextId,
    locationStateId,
    queryParamId,
}: {
    contextId?: string | null;
    locationStateId?: string | null;
    queryParamId?: string | null;
}): ServiceType {
    const VALID_SERVICES: ServiceType[] = ['dating', 'following', 'facetrace', 'fidelity'];
    const DEFAULT_SERVICE: ServiceType = 'facetrace';

    // Normalize service ID (handle variations)
    const normalize = (id?: string | null): ServiceType | null => {
        if (!id) return null;
        const normalized = id.toLowerCase().trim();

        // Handle common variations
        const aliases: Record<string, ServiceType> = {
            'dating': 'dating',
            'dating-search': 'dating',
            'tinder': 'dating',
            'following': 'following',
            'instagram': 'following',
            'following-ai': 'following',
            'facetrace': 'facetrace',
            'face-trace': 'facetrace',
            'face_trace': 'facetrace',
            'fidelity': 'fidelity',
            'fidelity-test': 'fidelity',
            'cheating': 'fidelity',
        };

        return aliases[normalized] || (VALID_SERVICES.includes(normalized as ServiceType) ? normalized as ServiceType : null);
    };

    // Try each source in priority order
    const resolved = normalize(contextId) || normalize(locationStateId) || normalize(queryParamId);

    return resolved || DEFAULT_SERVICE;
}

/**
 * Get service ID from URL search params
 */
export function getServiceFromUrl(): string | null {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    return params.get('service');
}
