import { trace } from "@opentelemetry/api";


const tracer = trace.getTracer("backend-dev.metadata");

const {username, lastname, email, message, checkbox} = formData;

export async function extractContactMetadata() {
  
}