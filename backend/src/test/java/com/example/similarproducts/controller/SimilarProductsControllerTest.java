package com.example.similarproducts.controller;

import com.example.similarproducts.exception.ProductNotFoundException;
import com.example.similarproducts.model.ProductDetail;
import com.example.similarproducts.service.SimilarProductsService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Mono;

import java.util.List;

import static org.mockito.Mockito.when;

@WebFluxTest(SimilarProductsController.class)
class SimilarProductsControllerTest {

    @Autowired
    private WebTestClient webTestClient;

    @MockitoBean
    private SimilarProductsService similarProductsService;

    @Test
    @DisplayName("GET /product/{id}/similar - returns 200 with similar products")
    void shouldReturnSimilarProducts() {
        List<ProductDetail> products = List.of(
                new ProductDetail("2", "Dress", 19.99, true),
                new ProductDetail("3", "Blazer", 29.99, false)
        );

        when(similarProductsService.getSimilarProducts("1"))
                .thenReturn(Mono.just(products));

        webTestClient.get()
                .uri("/product/1/similar")
                .exchange()
                .expectStatus().isOk()
                .expectBodyList(ProductDetail.class)
                .hasSize(2);
    }

    @Test
    @DisplayName("GET /product/{id}/similar - returns 404 when product not found")
    void shouldReturn404WhenProductNotFound() {
        when(similarProductsService.getSimilarProducts("999"))
                .thenReturn(Mono.error(new ProductNotFoundException("999")));

        webTestClient.get()
                .uri("/product/999/similar")
                .exchange()
                .expectStatus().isNotFound();
    }

    @Test
    @DisplayName("GET /product/{id}/similar - returns empty list when no similar products")
    void shouldReturnEmptyListWhenNoSimilarProducts() {
        when(similarProductsService.getSimilarProducts("1"))
                .thenReturn(Mono.just(List.of()));

        webTestClient.get()
                .uri("/product/1/similar")
                .exchange()
                .expectStatus().isOk()
                .expectBodyList(ProductDetail.class)
                .hasSize(0);
    }
}
