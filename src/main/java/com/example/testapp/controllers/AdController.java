package com.example.testapp.controllers;



import com.example.testapp.model.AdData;
import com.example.testapp.services.AdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ads")
public class AdController {
    @Autowired
    private AdService adService;

    @GetMapping
    public List<AdData> getAdData() {
        return adService.getAdData();
    }

    @GetMapping("/{date}")
    public AdData getAdDataByDate(@PathVariable String date) {
        return adService.getAdDataByDate(date);
    }

    @PostMapping
    public AdData addAdData(@RequestBody AdData newAdData) {
        System.out.println("Received POST request with data: " + newAdData);
        return adService.addAdData(newAdData);
    }

    @DeleteMapping("/{date}")
    public void deleteAdDataByDate(@PathVariable String date) {
        adService.deleteAdDataByDate(date);
    }
}
