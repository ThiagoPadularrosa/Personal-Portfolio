/*instrumentation.mjs*/
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { resourceFromAttributes } from '@opentelemetry/resources';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import config from '../config/config.js';


const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter,
  resource: resourceFromAttributes({
    [ATTR_SERVICE_VERSION]: config.SERVICE_VERSION,
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPTraceExporter,
    // Export metrics every 60seconds
    exportIntervalMillis: 60000,
  }),
  instrumentations: [getNodeAutoInstrumentations({
    // Ensure HTTP instrumentation captures headers for context propagation
    '@opentelemetry/instrumentation-http': { 
      enabled: true,
      applyCustomAttributesOnSpan(span, request) {
        const routePath = request.route?.path;

        if (!routePath) {
          return;
        }

        const route = `${request.baseUrl ?? ""}${routePath}`;

        span.updateName(`${request.method} ${route}`);
      },
     },
    '@opentelemetry/instrumentation-express': { enabled: true },
    }),
  ],
});
sdk.start(); // This run opentelemetry SKD before everything else

async function shutdown() {
  // Try and catch replaced .then and .catch
  try {
    await sdk.shutdown(); // Shutting down sdk to prevent memory leaks and/or data loss
    console.log('SDK shut down successfully');
  } catch (error) {
    console.log('Error shutting down SDK', error);
  } finally {
    process.exit(0);
  }
}
process.once("SIGTERM", shutdown);
process.once("SIGINT", shutdown);

export default sdk;