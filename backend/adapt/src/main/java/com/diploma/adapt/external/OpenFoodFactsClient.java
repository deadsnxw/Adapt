package com.diploma.adapt.external;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.HttpHeaders;

import com.diploma.adapt.dto.ApiResponseDTO;

import org.springframework.beans.factory.annotation.Value;

@Component
public class OpenFoodFactsClient {
    
    private final WebClient webClient;

    public OpenFoodFactsClient(
        WebClient.Builder webClientBuilder,
        @Value("${OPEN_FOOD_FACTS_URL}") String baseUrl) {

        this.webClient = webClientBuilder
                .baseUrl(baseUrl)
                .defaultHeader(HttpHeaders.USER_AGENT, "AdaptApp - Java SpringBoot Backend - Version 1.0")
                .build();
    }

    public ApiResponseDTO searchProducts(String query) {
        return this.webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/cgi/search.pl")
                        .queryParam("search_terms", query)
                        .queryParam("search_simple", "1")
                        .queryParam("action", "process")
                        .queryParam("json", "1")
                        .queryParam("fields", "product_name,nutriments")
                        .queryParam("page_size", "10")
                        .build())
                .retrieve()
                .bodyToMono(ApiResponseDTO.class)
                .block();
    }
}