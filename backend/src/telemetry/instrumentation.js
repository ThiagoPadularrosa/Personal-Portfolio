/*instrumentation.mjs*/
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import {
  PeriodicExportingMetricReader,
  ConsoleMetricExporter,
} from '@opentelemetry/sdk-metrics';
import { resourceFromAttributes } from '@opentelemetry/resources';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import config from '../config/config.js';


const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: config.OTEL_SERVICE_NAME,
    [ATTR_SERVICE_VERSION]: config.SERVICE_VERSION,
  }),
  traceExporter: new ConsoleSpanExporter(),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new ConsoleMetricExporter(),
    // Export metrics every 60seconds
    exportIntervalMillis: 60000,
  }),
  instrumentations: [getNodeAutoInstrumentations({
    // Ensure HTTP instrumentation captures headers for context propagation
    '@opentelemetry/instrumentation-express': { enabled: true },
    '@opentelemetry/instrumentation-http': { enabled: true },
  })],
});
sdk.start(); // This run opentelemetry SKD before everything else

process.on('SIGTERM', async () => {
  // Try and catch replaced .then and .catch
  try {
    await sdk.shutdown(); // Shutting down sdk to prevent memory leaks and/or data loss
    console.log('SDK shut down successfully');
  } catch (error) {
    console.log('Error shutting down SDK', error);
  } finally {
    process.exit(0);
  }
})

export default sdk;