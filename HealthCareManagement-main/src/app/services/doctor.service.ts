import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor';
import { Prescription } from '../models/prescription';
import { Slots } from '../models/slots';
import { User } from '../models/user';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  user = new User();
  doctor = new Doctor();

  constructor(private _http: HttpClient) { }

  addDoctorFromRemote(doctor: Doctor): Observable<any> {
    return this._http.post<any>(`${NAV_URL}/addDoctor`, doctor);
  }

  getDoctorList(): Observable<Doctor[]> {
    return this._http.get<Doctor[]>(`${NAV_URL}/doctorlist`);
  }

  getSlotList(): Observable<Slots[]> {
    return this._http.get<Slots[]>(`${NAV_URL}/slotDetails`);
  }

  getSlotListWithUniqueDoctors(): Observable<string[]> {
    return this._http.get<string[]>(`${NAV_URL}/slotDetailsWithUniqueDoctors`);
  }

  getSlotListWithUniqueSpecializations(): Observable<string[]> {
    return this._http.get<string[]>(`${NAV_URL}/slotDetailsWithUniqueSpecializations`);
  }

  getSlotDetails(loggedUser: string): Observable<Slots[]> {
    return this._http.get<Slots[]>(`${NAV_URL}/slotDetails/${loggedUser}`);
  }

  getDoctorListByEmail(loggedUser: string): Observable<Doctor[]> {
    return this._http.get<Doctor[]>(`${NAV_URL}/doctorlistbyemail/${loggedUser}`);
  }

  getPatientListByEmail(email: string): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/patientlistbyemail/${email}`);
  }

  getPatientList(): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/patientlist`);
  }

  getPatientListByDoctorEmail(loggedUser: string): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/patientlistbydoctoremail/${loggedUser}`);
  }

  getPatientListByDoctorEmailAndDate(loggedUser: string): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/patientlistbydoctoremailanddate/${loggedUser}`);
  }

  acceptRequestForDoctorApproval(email: string): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/acceptstatus/${email}`);
  }

  rejectRequestForDoctorApproval(email: string): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/rejectstatus/${email}`);
  }

  acceptRequestForPatientApproval(slot: string): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/acceptpatient/${slot}`);
  }

  rejectRequestForPatientApproval(slot: string): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/rejectpatient/${slot}`);
  }

  addBookingSlots(slot: Slots): Observable<any> {
    return this._http.post<any>(`${NAV_URL}/addBookingSlots`, slot);
  }

  addPrescriptions(prescription: Prescription): Observable<any> {
    return this._http.post<any>(`${NAV_URL}/addPrescription`, prescription);
  }

  getProfileDetails(loggedUser: string): Observable<Doctor[]> {
    return this._http.get<Doctor[]>(`${NAV_URL}/doctorProfileDetails/${loggedUser}`);
  }

  UpdateDoctorProfile(user: Doctor): Observable<Doctor> {
    return this._http.put<Doctor>(`${NAV_URL}/updatedoctor`, user);
  }

  deleteDoctor(email: string): Observable<string> {
    const role = sessionStorage.getItem('ROLE') || '';
    return this._http.delete(`${NAV_URL}/deletedoctor/${email}/${role}`, {
      responseType: 'text'
    });
  }
}