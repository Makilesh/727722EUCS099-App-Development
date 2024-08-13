package com.example.giftportal.controller;

import com.example.giftportal.model.Address;
import com.example.giftportal.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping
    public List<Address> getAllAddresses() {
        return addressService.getAllAddresses();
    }

    @GetMapping("/{id}")
    public Optional<Address> getAddressById(@PathVariable Long id) {
        return addressService.getAddressById(id);
    }

    @PostMapping
    public Address createAddress(@RequestBody Address address) {
        return addressService.createAddress(address);
    }

    @DeleteMapping("/{id}")
    public void deleteAddress(@PathVariable Long id) {
        addressService.deleteAddress(id);
    }
}
