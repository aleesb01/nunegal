package com.example.similarproducts.client;

import com.example.similarproducts.model.ProductDetail;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

/**
 * HTTP client for the existing product APIs.
 * Handles communication with the mock services and error scenarios gracefully.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class ProductApiClient {

    private final WebClient webClient;

    /**
     * Retrieves the list of similar product IDs for a given product.
     *
     * @param productId the product identifier
     * @return a Mono emitting a list of similar product IDs, or Mono.empty() on 404
     */
    public Mono<List<String>> getSimilarProductIds(String productId) {
        return webClient.get()
                .uri("/product/{productId}/similarids", productId)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, response ->
                        Mono.empty()
                )
                .bodyToFlux(String.class)
                .collectList()
                .doOnError(error -> log.warn("Error fetching similar IDs for product {}: {}",
                        productId, error.getMessage()));
    }

    /**
     * Retrieves the product detail for a given product ID.
     *
     * @param productId the product identifier
     * @return a Mono emitting the ProductDetail, or Mono.empty() on 404 or error
     */
    public Mono<ProductDetail> getProductDetail(String productId) {
        return webClient.get()
                .uri("/product/{productId}", productId)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, response ->
                        Mono.empty()
                )
                .bodyToMono(ProductDetail.class)
                .doOnError(error -> log.warn("Error fetching detail for product {}: {}",
                        productId, error.getMessage()))
                .onErrorResume(error -> Mono.empty());
    }
}
