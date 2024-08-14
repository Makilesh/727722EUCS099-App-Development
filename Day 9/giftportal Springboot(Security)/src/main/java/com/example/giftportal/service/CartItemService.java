package com.example.giftportal.service;

import com.example.giftportal.model.Cart;
import com.example.giftportal.model.CartItem;
import com.example.giftportal.model.User;
import com.example.giftportal.repository.CartItemRepository;
import com.example.giftportal.repository.CartRepository;
import com.example.giftportal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

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

    public List<CartItem> getCartItemsByUserId(Long userId) {
        return cartItemRepository.findCartItemsByUserId(userId);
    }
    
    public CartItem addProductToCart(Long userId, CartItem cartItem) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (!userOptional.isPresent()) {
            throw new RuntimeException("User not found");
        }
        User user = userOptional.get();

        Cart cart = cartRepository.findByUserId(userId).orElseGet(() -> {
            Cart newCart = new Cart();
            newCart.setUser(user);
            return cartRepository.save(newCart);
        });

        cartItem.setCart(cart);
        return cartItemRepository.save(cartItem);
    }
}
