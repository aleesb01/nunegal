package com.example.similarproducts.service;

import com.example.similarproducts.client.ProductApiClient;
import com.example.similarproducts.exception.ProductNotFoundException;
import com.example.similarproducts.model.ProductDetail;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SimilarProductsServiceTest {

    @Mock
    private ProductApiClient productApiClient;

    @InjectMocks
    private SimilarProductsService similarProductsService;

    @Test
    @DisplayName("Should return similar product details for a valid product")
    void shouldReturnSimilarProducts() {
        // Given
        String productId = "1";
        List<String> similarIds = List.of("2", "3", "4");
        ProductDetail product2 = new ProductDetail("2", "Dress", 19.99, true);
        ProductDetail product3 = new ProductDetail("3", "Blazer", 29.99, false);
        ProductDetail product4 = new ProductDetail("4", "Boots", 39.99, true);

        when(productApiClient.getSimilarProductIds(productId))
                .thenReturn(Mono.just(similarIds));
        when(productApiClient.getProductDetail("2")).thenReturn(Mono.just(product2));
        when(productApiClient.getProductDetail("3")).thenReturn(Mono.just(product3));
        when(productApiClient.getProductDetail("4")).thenReturn(Mono.just(product4));

        // When & Then
        StepVerifier.create(similarProductsService.getSimilarProducts(productId))
                .assertNext(products -> {
                    assertThat(products).hasSize(3);
                    assertThat(products).containsExactlyInAnyOrder(product2, product3, product4);
                })
                .verifyComplete();
    }

    @Test
    @DisplayName("Should throw ProductNotFoundException when product has no similar IDs")
    void shouldThrowWhenProductNotFound() {
        // Given
        String productId = "999";
        when(productApiClient.getSimilarProductIds(productId))
                .thenReturn(Mono.empty());

        // When & Then
        StepVerifier.create(similarProductsService.getSimilarProducts(productId))
                .expectError(ProductNotFoundException.class)
                .verify();
    }

    @Test
    @DisplayName("Should skip products that return empty (e.g., 404 from detail API)")
    void shouldSkipUnavailableProducts() {
        // Given
        String productId = "1";
        List<String> similarIds = List.of("2", "3", "4");
        ProductDetail product2 = new ProductDetail("2", "Dress", 19.99, true);
        ProductDetail product4 = new ProductDetail("4", "Boots", 39.99, true);

        when(productApiClient.getSimilarProductIds(productId))
                .thenReturn(Mono.just(similarIds));
        when(productApiClient.getProductDetail("2")).thenReturn(Mono.just(product2));
        when(productApiClient.getProductDetail("3")).thenReturn(Mono.empty()); // 404 scenario
        when(productApiClient.getProductDetail("4")).thenReturn(Mono.just(product4));

        // When & Then
        StepVerifier.create(similarProductsService.getSimilarProducts(productId))
                .assertNext(products -> {
                    assertThat(products).hasSize(2);
                    assertThat(products).containsExactlyInAnyOrder(product2, product4);
                })
                .verifyComplete();
    }

    @Test
    @DisplayName("Should return empty list when all similar products are unavailable")
    void shouldReturnEmptyListWhenAllProductsUnavailable() {
        // Given
        String productId = "1";
        List<String> similarIds = List.of("2", "3");

        when(productApiClient.getSimilarProductIds(productId))
                .thenReturn(Mono.just(similarIds));
        when(productApiClient.getProductDetail("2")).thenReturn(Mono.empty());
        when(productApiClient.getProductDetail("3")).thenReturn(Mono.empty());

        // When & Then
        StepVerifier.create(similarProductsService.getSimilarProducts(productId))
                .assertNext(products -> assertThat(products).isEmpty())
                .verifyComplete();
    }
}
