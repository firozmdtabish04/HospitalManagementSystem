package com.Hospital.Management.System.docLogin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.management.AttributeNotFoundException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Hospital.Management.System.docLogin.entity.Appointment;
import com.Hospital.Management.System.docLogin.repository.AppointmentsRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {
	AppointmentsRepository appointmentsRepository;

	public AppointmentController(AppointmentsRepository appointmentsRepository) {
		super();
		this.appointmentsRepository = appointmentsRepository;
	}
	
	@PostMapping("/createappointments")
	public Appointment createAppointment(@RequestBody Appointment appointment) {
		return appointmentsRepository.save(appointment);
	} 
	
	@GetMapping("/getappointments")
	public List<Appointment> getAllapAppointments(){
		return appointmentsRepository.findAll();
	}
	
	@DeleteMapping("/deleteappointments/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteAppointment(@PathVariable long id) throws AttributeNotFoundException {
	    Appointment appointment = appointmentsRepository.findById(id)
	            .orElseThrow(() -> new AttributeNotFoundException("Appointment not found by id: " + id));

	    appointmentsRepository.delete(appointment);

	    Map<String, Boolean> response = new HashMap<>();
	    response.put("Deleted", Boolean.TRUE);

	    return ResponseEntity.ok(response);
	}

}
