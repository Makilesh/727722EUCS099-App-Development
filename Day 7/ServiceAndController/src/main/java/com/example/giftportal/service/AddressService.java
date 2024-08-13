package com.example.giftportal.service;

import com.example.giftportal.model.Address;
import com.example.giftportal.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressService {
    @Autowired
    private AddressRepository addressRepository;

    public List<Address> getAllAddresses() {
        return addressRepository.findAll();
    }

    public Optional<Address> getAddressById(Long id) {
        return addressRepository.findById(id);
    }

    public Address createAddress(Address address) {
        return addressRepository.save(address);
    }

    public void deleteAddress(Long id) {
        addressRepository.deleteById(id);
    }

    // Additional business methods as needed
}
