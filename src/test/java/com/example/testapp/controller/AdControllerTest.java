package com.example.testapp.controller;



import com.example.testapp.controllers.AdController;
import com.example.testapp.model.AdData;
import com.example.testapp.services.AdService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AdController.class)
public class AdControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AdService adService;

    @Test
    public void testGetAdData() throws Exception {
        AdData ad1 = new AdData("2024-07-01", 150, 2000);
        AdData ad2 = new AdData("2024-07-02", 200, 3000);
        AdData ad3 = new AdData("2024-07-03", 180, 2500);

        given(adService.getAdData()).willReturn(Arrays.asList(ad1, ad2, ad3));

        mockMvc.perform(get("/api/ads")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("[{'date':'2024-07-01','clicks':150,'impressions':2000}," +
                        "{'date':'2024-07-02','clicks':200,'impressions':3000}," +
                        "{'date':'2024-07-03','clicks':180,'impressions':2500}]"));
    }

    @Test
    public void testGetAdDataByDate() throws Exception {
        AdData ad1 = new AdData("2024-07-01", 150, 2000);

        given(adService.getAdDataByDate("2024-07-01")).willReturn(ad1);

        mockMvc.perform(get("/api/ads/2024-07-01")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("{'date':'2024-07-01','clicks':150,'impressions':2000}"));
    }

    @Test
    public void testAddAdData() throws Exception {
        AdData newAdData = new AdData("2024-07-04", 220, 3200);

        given(adService.addAdData(newAdData)).willReturn(newAdData);

        mockMvc.perform(post("/api/ads")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"date\":\"2024-07-04\",\"clicks\":220,\"impressions\":3200}"))
                .andExpect(status().isOk())
                .andExpect(content().json("{'date':'2024-07-04','clicks':220,'impressions':3200}"));
    }
}
