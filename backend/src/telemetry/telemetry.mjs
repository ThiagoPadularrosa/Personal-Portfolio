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

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: config.OTEL_SERVICE_NAME,
    [ATTR_SERVICE_VERSION]: config.SERVICE_VERSION,
  }),
  traceExporter: new OTLPTraceExporter({
    url: 'http://collector:4318/v1/traces',
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: 'http://collector:4318/v1/metrics',
    }),
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
try {
  sdk.start();
  console.log("Opentelemetry SDK started successfully");  
} catch (error) {
  console.error("Error starting Opentelemetry SDK:", error);
}


export default sdk;