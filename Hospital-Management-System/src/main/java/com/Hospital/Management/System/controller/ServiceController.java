package com.Hospital.Management.System.controller;

import com.Hospital.Management.System.entity.HospitalService;
import com.Hospital.Management.System.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
@CrossOrigin(origins = "http://localhost:4200")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @GetMapping
    public List<HospitalService> getAllServices() {
        return serviceRepository.findAll();
    }

    @PostMapping
    public HospitalService addService(@RequestBody HospitalService service) {
        return serviceRepository.save(service);
    }
}
