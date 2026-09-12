package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.MobileRecharge;
import com.example.service.MobileRechargeService;

import jakarta.validation.Valid;

@RestController
public class MobileRechargeController {

    @Autowired
    private MobileRechargeService service;

    @PostMapping("/recharge")
    public MobileRecharge addRecharge(@Valid @RequestBody MobileRecharge recharge) 
    {
        return service.addRecharge(recharge);
    }

    @GetMapping("/recharges")
    public List<MobileRecharge> getAllRecharges() {

        return service.getAllRecharges();
    }
    
    @GetMapping("/recharge/{rechargeId}")
    public MobileRecharge getRechargeById(
            @PathVariable int rechargeId) {

        return service.getRechargeById(rechargeId);
    }	
    
    @DeleteMapping("/recharge/{rechargeId}")
    public String deleteRecharge(@PathVariable int rechargeId) {

        boolean deleted = service.deleteRecharge(rechargeId);

        if (deleted) {
            return "Recharge deleted successfully";
        }

        return "Recharge not found";
    }
    
    @PutMapping("/recharge/{rechargeId}")
    public String updateRecharge(@PathVariable int rechargeId,@Valid @RequestBody MobileRecharge recharge) {

        boolean updated = service.updateRecharge(rechargeId, recharge);

        if (updated) {
            return "Recharge updated successfully";
        }

        return "Recharge not found";
    }
    
    @GetMapping("/recharge/mobile/{mobileNumber}")
    public List<MobileRecharge> getByMobileNumber(@PathVariable String mobileNumber)
    
    {

        return service.getByMobileNumber(mobileNumber);
    }
}