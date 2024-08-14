package com.example.giftportal.service;

import com.example.giftportal.model.Cart;
import com.example.giftportal.model.CartItem;
import com.example.giftportal.repository.CartRepository;
import com.example.giftportal.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    public Optional<Cart> getCartById(Long id) {
        return cartRepository.findById(id);
    }

    // public Optional<CartItem> getCartByUserId(Long userId) {
    //     return (Optional<CartItem>) cartRepository.findByCart_User_Id(userId);
    // }

    public Cart createCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public void deleteCart(Long id) {
        cartRepository.deleteById(id);
    }
}
