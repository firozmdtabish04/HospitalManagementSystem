package com.Hospital.Management.System.bookappointment.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Hospital.Management.System.bookappointment.entity.BookAppointment;
import com.Hospital.Management.System.bookappointment.repository.BookAppointmentRepository;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200") // Allow Angular frontend
@RestController
@RequestMapping("/api/bookappointments") // Base URL for this controller
public class BookAppointmentController {

    @Autowired
    private BookAppointmentRepository repository;

    // Save a new appointment (POST)
    @PostMapping
    public BookAppointment saveAppointment(@RequestBody BookAppointment appointment) {
        return repository.save(appointment);
    }

    // Get all appointments (GET)
    @GetMapping
    public List<BookAppointment> getAllAppointments() {
        return repository.findAll();
    }
}
