package com.example.giftportal.repository;

import com.example.giftportal.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    // Additional query methods can be defined here
}
