import { registerHooks } from 'node:module';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { resourceFromAttributes } from '@opentelemetry/resources';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import config from '../config/config.js';

registerHooks('--experimental-loader=@opentelemetry/instrumentation/hook.mjs', import.meta.url)

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter,
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: config.OTEL_SERVICE_NAME,
    [ATTR_SERVICE_VERSION]: config.SERVICE_VERSION,
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter,
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
    '@opentelemetry/instrumentation-mongodb': { enabled: true },
    '@opentelemetry/instrumentation-mongoose': { enabled: true },
    }),
  ],
});
sdk.start(); // This run opentelemetry SKD before everything else

export default sdk;