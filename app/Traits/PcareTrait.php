<?php

namespace App\Traits;

/**
 * Backward-compatible wrapper trait to satisfy legacy controllers that
 * reference App\Traits\PcareTrait. Internally delegates to BpjsTraits.
 */
trait PcareTrait
{
    use BpjsTraits;

    /**
     * Backward-compatible helper used by various controllers.
     *
     * Accepted call styles:
     * 1) GET (simple):
     *    requestPcare(endpoint)
     *
     * 2) Explicit method + payload + content type:
     *    requestPcare(endpoint, 'POST', payloadArray, 'text/plain'|'application/json')
     *
     * 3) Legacy order (payload first), though discouraged:
     *    requestPcare(endpoint, payloadArray, 'POST', 'text/plain')
     *
     * This flexible signature prevents IDE/static analysis warnings while
     * preserving runtime behavior for existing callers.
     */
    protected function requestPcare(string $endpoint, $arg2 = null, $arg3 = null, $arg4 = null)
    {
        // Defaults
        $method = 'GET';
        $payload = [];
        $contentType = 'application/json';

        // Detect calling convention
        if (is_string($arg2)) {
            // Style (2): endpoint, 'POST', payloadArray, 'text/plain'
            $method = strtoupper($arg2);
            if (is_array($arg3)) {
                $payload = $arg3;
            }
            if (is_string($arg4)) {
                $contentType = $arg4;
            } elseif (is_string($arg3)) {
                // If third argument is provided as content type by mistake
                $contentType = $arg3;
            }
        } elseif (is_array($arg2)) {
            // Style (3): endpoint, payloadArray, 'POST', 'text/plain'
            $payload = $arg2;
            if (is_string($arg3)) {
                $method = strtoupper($arg3);
            }
            if (is_string($arg4)) {
                $contentType = $arg4;
            }
        } elseif ($arg2 === null && $arg3 === null && $arg4 === null) {
            // Style (1): simple GET
            // keep defaults
        }

        // Build extra headers for content type if provided
        $extraHeaders = [];
        if (! empty($contentType)) {
            $extraHeaders['Content-Type'] = $contentType;
        }

        // Dispatch via unified pcareRequest helper
        $result = $this->pcareRequest($method, $endpoint, [], $payload, $extraHeaders);
        $response = $result['response'];

        return $this->maybeDecryptAndDecompress($response->body(), $result['timestamp_used']);
    }
}
