package com.example.giftportal.service;

import com.example.giftportal.model.Cart;
import com.example.giftportal.model.CartItem;
import com.example.giftportal.repository.CartItemRepository;
import com.example.giftportal.repository.CartRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    public Optional<CartItem> getCartItemById(Long id) {
        return cartItemRepository.findById(id);
    }

    public CartItem createCartItem(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    public void deleteCartItem(Long id) {
        cartItemRepository.deleteById(id);
    }
 
    public CartItem addProductToCart(Long userId, CartItem cartItem) {
        Optional<Cart> userCart = cartRepository.findByUserId(userId);

        if (userCart.isPresent()) {
            Cart cart = userCart.get();
            cartItem.setCart(cart);
            return cartItemRepository.save(cartItem);
        } else {
            throw new RuntimeException("Cart not found for user with id: " + userId);
        }
    }

    // Additional business logic can be added here
}
