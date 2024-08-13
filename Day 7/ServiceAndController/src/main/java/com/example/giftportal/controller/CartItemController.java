package com.example.giftportal.controller;

import com.example.giftportal.model.CartItem;
import com.example.giftportal.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart-items")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @GetMapping
    public List<CartItem> getAllCartItems() {
        return cartItemService.getAllCartItems();
    }

    @GetMapping("/{id}")
    public Optional<CartItem> getCartItemById(@PathVariable Long id) {
        return cartItemService.getCartItemById(id);
    }

    @PostMapping
    public CartItem createCartItem(@RequestBody CartItem cartItem) {
        return cartItemService.createCartItem(cartItem);
    }

    @DeleteMapping("/{id}")
    public void deleteCartItem(@PathVariable Long id) {
        cartItemService.deleteCartItem(id);
    }

    // Additional endpoints can be defined here
}
