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
  const startTime = Date.now();

  // Hook into the response finish event
  res.on('finish', () => {
    const duration = (Date.now() - startTime) / 1000;
    const route = req.route?.path
      ? `${req.baseUrl || ''}${req.route.path}`
      : 'unknown';
    const method = req.method;
    const statusCode = res.statusCode;

    // Common attributes for all metrics
    const attributes = {
      'http.request.method': method,
      'http.route': route,
      'http.response.status_code': statusCode,
    };

    // Record latency
    requestDuration.record(duration, attributes);

    // Record throughput
    requestCount.add(1, attributes);

    // Record errors (4xx and 5xx)
    if (statusCode >= 400) {
      errorCount.add(1, attributes);
    }
  });

  next();
}

export default metricsMiddleware;