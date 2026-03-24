package com.example.similarproducts.controller;

import com.example.similarproducts.model.ProductDetail;
import com.example.similarproducts.service.SimilarProductsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.List;

/**
 * REST controller exposing the similar products endpoint.
 * Contract: GET /product/{productId}/similar → List of ProductDetail
 */
@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class SimilarProductsController {

    private final SimilarProductsService similarProductsService;

    /**
     * Returns the list of similar product details for the given product.
     *
     * @param productId the product identifier
     * @return 200 with a list of ProductDetail, or 404 if product not found
     */
    @GetMapping("/{productId}/similar")
    public Mono<List<ProductDetail>> getSimilarProducts(@PathVariable String productId) {
        return similarProductsService.getSimilarProducts(productId);
    }
}
