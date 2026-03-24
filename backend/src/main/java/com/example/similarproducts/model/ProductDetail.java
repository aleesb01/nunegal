package com.example.similarproducts.model;

/**
 * Represents the detail of a product.
 * Uses a Java record for immutability and conciseness.
 *
 * @param id           the product identifier
 * @param name         the product name
 * @param price        the product price
 * @param availability whether the product is available
 */
public record ProductDetail(
        String id,
        String name,
        Number price,
        Boolean availability
) {
}
