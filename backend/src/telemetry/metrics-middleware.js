import { metrics } from '@opentelemetry/api';

const meter = metrics.getMeter('rest-api-metrics');

// Histogram for latency - tracks the distribution of response times
const requestDuration = meter.createHistogram('http.server.request.duration', {
  description: 'Duration of HTTP server requests',
  unit: 's',
});

// Counter for throughput - total number of requests
const requestCount = meter.createCounter('http.server.request.count', {
  description: 'Total number of HTTP requests',
});

// Counter for errors - total number of failed requests
const errorCount = meter.createCounter('http.server.error.count', {
  description: 'Total number of HTTP error responses',
});

function metricsMiddleware(req, res, next) {
  // Checking if req or res exist to prevent errors if invoked incorrectly
  if (!req || !res) {
    return next ? next() : void 0;
  }

  const startTime = Date.now();

  // Hook into the response finish event
  res.on('finish', () => {
      try {   
        const duration = (Date.now() - startTime) / 1000;

        // Building the route string
        const baseUrl = req.baseUrl || '';
        const routePath = req.route?.path || 'unknown';
        const route = routePath !== 'unknown'
          ? `${baseUrl}${routePath}`
          : 'unknown';

        const method = req.method || 'UNKNOWN';
        const statusCode = res.statusCode || 200;

        // Common attributes for all metrics
        const attributes = {
          'http.request.method': String(method),
          'http.route': String(route),
          'http.response.status_code': Number(statusCode),
        };

        // Record latency
        requestDuration?.record?.(duration, attributes);
        // Record throughput
        requestCount?.add?.(1, attributes);

        // Record errors (4xx and 5xx)
        if (statusCode >= 400) {
          errorCount?.add?.(1, attributes);
        }
      } catch (error) {
        console.error('Error recording OpenTelemetry metrics:', error);
      }
  });

  if (typeof next === 'function') {
    next();
  }
}

export default metricsMiddleware;