package com.example.testapp.services;


import com.example.testapp.exception.ResourceNotFoundException;
import com.example.testapp.model.AdData;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
@Service
public class AdService {

    private List<AdData> adDataList = new ArrayList<>(Arrays.asList(
            new AdData("2024-07-01", 150, 2000),
            new AdData("2024-07-02", 200, 3000),
            new AdData("2024-07-03", 180, 2500)
    ));

    public List<AdData> getAdData() {
        return adDataList;
    }

    public AdData getAdDataByDate(String date) {
        return adDataList.stream()
                .filter(ad -> ad.getDate().equals(date))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Data not found for date: " + date));
    }

    public AdData addAdData(AdData newAdData) {
        adDataList.add(newAdData);
        return newAdData;
    }

    public void deleteAdDataByDate(String date) {
        AdData adData = getAdDataByDate(date);
        adDataList.remove(adData);
    }
}
