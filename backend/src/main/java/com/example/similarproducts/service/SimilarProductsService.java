package com.example.similarproducts.service;

import com.example.similarproducts.client.ProductApiClient;
import com.example.similarproducts.exception.ProductNotFoundException;
import com.example.similarproducts.model.ProductDetail;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

/**
 * Service that orchestrates fetching similar products.
 * Retrieves similar product IDs and then fetches each product's detail in parallel.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SimilarProductsService {

    private final ProductApiClient productApiClient;

    /**
     * Gets the detailed information of all similar products for a given product ID.
     * Products that cannot be retrieved (e.g., 404) are silently skipped.
     *
     * @param productId the product identifier
     * @return a Mono emitting the list of similar product details
     * @throws ProductNotFoundException if the product itself is not found
     */
    @CircuitBreaker(name = "similarProducts", fallbackMethod = "fallbackSimilarProducts")
    public Mono<List<ProductDetail>> getSimilarProducts(String productId) {
        return productApiClient.getSimilarProductIds(productId)
                .switchIfEmpty(Mono.error(new ProductNotFoundException(productId)))
                .flatMapMany(Flux::fromIterable)
                .flatMap(productApiClient::getProductDetail)
                .collectList();
    }

    /**
     * Fallback method for circuit breaker.
     * Returns an empty list when the circuit is open or an unexpected error occurs.
     */
    private Mono<List<ProductDetail>> fallbackSimilarProducts(String productId, Throwable throwable) {
        if (throwable instanceof ProductNotFoundException) {
            return Mono.error(throwable);
        }
        log.error("Circuit breaker fallback for product {}: {}", productId, throwable.getMessage());
        return Mono.just(List.of());
    }
}
