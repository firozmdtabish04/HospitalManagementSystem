package com.Hospital.Management.System.controller;

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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Hospital.Management.System.entity.Patient;
import com.Hospital.Management.System.repository.PatientRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/patient")
public class PatientController {
	private PatientRepository patientRepository;

	public PatientController(PatientRepository patientRepository) {
		super();
		this.patientRepository = patientRepository;
		
	}
	@PostMapping("/Createpatients")
	public Patient createPatient(@RequestBody Patient patient) {
		return patientRepository.save(patient);
	}
	@GetMapping("/getpatients")
	public List<Patient>getAllPatients(){
		return patientRepository.findAll();
	}
	
	@GetMapping("/patients/{id}")
	public ResponseEntity<Patient> getPatientById(@PathVariable long id) throws AttributeNotFoundException{
		Patient patient= patientRepository.findById(id).orElseThrow(()->new AttributeNotFoundException("Patient not found With id" +id));
		return ResponseEntity.ok(patient);
	}
	
	@DeleteMapping("/deletepatients/{id}")
	public ResponseEntity<Map<String, Boolean>> deletePatient(@PathVariable Long id) throws AttributeNotFoundException{
		Patient patient = patientRepository.findById(id).orElseThrow(()->new AttributeNotFoundException("Patient not found With id."+id));
		patientRepository.delete(patient);
		Map<String, Boolean> response=new HashMap<String, Boolean>();
		response.put("Deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	@PutMapping("/Updatepatients/{id}")
	public ResponseEntity<Patient> updatePatientById(@PathVariable long id, @RequestBody Patient patientdetails) throws AttributeNotFoundException {
	    Patient patient = patientRepository.findById(id).orElseThrow(() -> new AttributeNotFoundException("Patient not found With id." + id));

	    patient.setAge(patientdetails.getAge());
	    patient.setName(patientdetails.getName());
	    patient.setBlood(patientdetails.getBlood());
	    patient.setDose(patientdetails.getDose());
	    patient.setFees(patientdetails.getFees());
	    patient.setUrgency(patientdetails.getUrgency());
	    patient.setPrescription(patientdetails.getPrescription());

	    Patient savedPatient = patientRepository.save(patient);
	    return ResponseEntity.ok(savedPatient);
	}
	
	

}
