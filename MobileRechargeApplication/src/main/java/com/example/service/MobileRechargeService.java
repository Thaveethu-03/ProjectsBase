package com.example.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.model.MobileRecharge;

@Service
public class MobileRechargeService {

    private List<MobileRecharge> rechargeList = new ArrayList<>();

    public MobileRecharge addRecharge(MobileRecharge recharge) {
        rechargeList.add(recharge);
        return recharge;
    }

    public List<MobileRecharge> getAllRecharges() 
    {
        return rechargeList;
    }

    public MobileRecharge getRechargeById(int rechargeId) {

        for (MobileRecharge recharge : rechargeList) {

            if (recharge.getRechargeId() == rechargeId) {
                return recharge;
            }
        }

        return null;
    }
    
    public boolean deleteRecharge(int rechargeId) {

        return rechargeList.removeIf(
            recharge -> recharge.getRechargeId() == rechargeId
        );
    }
    
    public boolean updateRecharge(int rechargeId, MobileRecharge updatedRecharge) {

        for (int i = 0; i < rechargeList.size(); i++) {

            if (rechargeList.get(i).getRechargeId() == rechargeId)
            {
                rechargeList.set(i, updatedRecharge);
                return true;
            }
        }

        return false;
    }
    
    public List<MobileRecharge> getByMobileNumber(String mobileNumber) {

        List<MobileRecharge> result = new ArrayList<>();

        for (MobileRecharge recharge : rechargeList) {

            if (recharge.getMobileNumber().equals(mobileNumber)) {
                result.add(recharge);
            }
        }

        return result;
    }
}