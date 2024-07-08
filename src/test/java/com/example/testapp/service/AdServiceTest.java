package com.example.testapp.service;


import com.example.testapp.model.AdData;
import com.example.testapp.services.AdService;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class AdServiceTest {
    private final AdService adService = new AdService();

    @Test
    public void testGetAdData(){
        List<AdData> adDataList = adService.getAdData();
        assertEquals(3, adDataList.size());
        assertEquals("2024-07-01", adDataList.getFirst().getDate());
        assertEquals(150, adDataList.getFirst().getClicks());
        assertEquals(2000, adDataList.getFirst().getImpressions());
    }
}
