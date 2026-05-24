package com.diploma.adapt.repository;

import java.util.Optional;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.diploma.adapt.model.Product;

public interface ProductRepository extends JpaRepository<Product, UUID> {
    List<Product> findByProductNameContainingIgnoreCase(String productName);   

    Optional<Product> findByExternalId(String externalId);
}