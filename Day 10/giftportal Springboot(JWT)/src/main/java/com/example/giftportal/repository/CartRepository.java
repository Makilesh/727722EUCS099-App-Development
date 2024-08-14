package com.example.giftportal.repository;

import com.example.giftportal.model.Cart;
import com.example.giftportal.model.CartItem;
import com.example.giftportal.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUserId(Long userId);
    
}
