class TokenBucket {
  constructor(capacity, refillAmount, refillIntervalMs) {
    this.capacity = capacity;                 // Máximo de tokens permitidos
    this.tokens = capacity;                   // Tokens actuales
    this.refillAmount = refillAmount;         // Cuántos tokens se agregan por ciclo
    this.refillIntervalMs = refillIntervalMs; // Cada cuántos milisegundos se agregan
    this.lastRefill = Date.now();
  }

  refill() {
    const now = Date.now();
    const elapsedMs = now - this.lastRefill;

    // Calcular cuántos intervalos completos pasaron desde la última petición
    if (elapsedMs >= this.refillIntervalMs) {
      const intervalsPassed = Math.floor(elapsedMs / this.refillIntervalMs);
      const tokensToAdd = intervalsPassed * this.refillAmount;

      this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
      
      // Mover el puntero solo por los intervalos consumidos
      this.lastRefill += intervalsPassed * this.refillIntervalMs;
    }
  }

  consume(count = 1) {
    this.refill();
    if (this.tokens >= count) {
      this.tokens -= count;
      return true;
    }
    return false;
  }
}

export default TokenBucket;
